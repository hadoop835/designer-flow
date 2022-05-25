import * as React from 'react';
import './index.less'; 
import locale from './locales/index'; 
import LangContext from "./util/context";
import { seqflowId,seqflowValue,delflowId,BpmnElements,ExtensionElements} from "./util/bpm";
import {Row, Col} from 'antd'
import DetailPanel from "./components/detailpanel";
import { IDefaultModel, IProcessModel, ISelectData } from './types';
import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css'; 
import { DndPanel, SelectionSelect,Control,Menu,MiniMap,Snapshot} from '@logicflow/extension'; 
import '@logicflow/extension/lib/style/index.css';
import Panel from "./components/nodepanel";
import {BpmElement} from './components/bpmpanel'
import {BpmAdapter,BpmXmlAdapter} from './components/bpmadapter'
import {ExtToolbarMiniMap,ExtDownloadXml,ExtDownloadImg} from './components/toolbarpanel'
LogicFlow.use(DndPanel);
LogicFlow.use(SelectionSelect);
Control.addItem(ExtDownloadXml);
Control.addItem(ExtDownloadImg);
Control.addItem(ExtToolbarMiniMap);
LogicFlow.use(Control);
LogicFlow.use(BpmElement);
LogicFlow.use(BpmAdapter);
LogicFlow.use(BpmXmlAdapter);
LogicFlow.use(Menu);
LogicFlow.use(MiniMap);
LogicFlow.use(Snapshot); 
type FileEventTarget = EventTarget & { files: FileList };
export interface DesignerProps {
  /** 画布高度 */
  height?: number;
  /** 是否只显示中间画布 */
  isView?: boolean;
  /** 模式为只读或编辑 */
  mode: 'default' | 'view' | 'edit';
  /** 语言 */
  lang?: 'en' | 'zh';
  /** 流程数据 */
  data: any;
  /** 审核人 */
  users?: ISelectData[];
  /** 审核组 */
  groups?: ISelectData[];
}

export interface DesignerStates {
  selectedModel: IDefaultModel;
  processModel: IProcessModel;
  modalVisible: false;
}

export default class Designer extends React.Component<DesignerProps, DesignerStates> {
  static defaultProps = {
    height: 500,
    isView: false,
    mode: 'edit',
    lang: 'zh',
  };
  private readonly pageRef: React.RefObject<any>; 
  private readonly detailPanelRef: React.RefObject<any>;
  private resizeFunc: (...args: any[]) => any;
  public graph: any;
  public cmdPlugin: any;
  public grid: any;
  constructor(cfg: DesignerProps) {
    super(cfg);
    this.pageRef = React.createRef(); 
    this.detailPanelRef = React.createRef();
    this.resizeFunc = () => {};
    this.state = {
      modalVisible: false,
      selectedModel: {},
      processModel: {
        id: '',
        name: '',
        clazz: 'process',
        dataObjs: [],
        signalDefs: [],
        messageDefs: [],
      },
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.data !== this.props.data){
      if(this.graph){
        this.graph.changeData(this.initShape(this.props.data));
        this.graph.setMode(this.props.mode);
        // this.graph.emit('canvas:click');
        if(this.cmdPlugin){
          this.cmdPlugin.initPlugin(this.graph);
        }
        if(this.props.isView){
          this.graph.fitView(5)
        }
      }
    }
  }

  componentDidMount() {
    const { isView,mode } = this.props;
    const height = this.props.height-1;
    const width = this.pageRef.current.scrollWidth;
    this.graph =new LogicFlow({ 
      container: this.pageRef.current,
      stopScrollGraph: true,
      stopZoomGraph: true,
      height: height,
      width: width,
      background: {
        color: '#F0F0F0'
      },
      grid: {
        type: 'mesh',
        size: 20,
      },
      // 工具配置
      textEdit: true,
      isSilentMode: false,
      edgeType: 'line',
      snapline: true,
      // 样式配置
      style: {
        rect: {
          radius: 6
        }
      }
    });
    this.graph.render(this.props.data ? this.props.data : {nodes:[],edges:[]});
    this.initEvents(this.graph);
  }

  initShape(data){
    // if(data && data.nodes){
    //   return {
    //     nodes: data.nodes.map(node => {
    //       return {
    //         type: getShapeName(node.clazz),
    //         ...node,
    //       }
    //     }),
    //     edges: data.edges
    //   }
    // }
    return data;
  }

  initEvents= (lf: LogicFlow) => {
    lf.on('element:click', ({ data }) => {
      debugger
       this.handleModalVisible(true);
       this.onItemClick(data.id,data);
    });
    //
    const page = this.pageRef.current;
    const graph = this.graph;
    const height = this.props.height-1;
    this.resizeFunc = ()=>{  
    };
    window.addEventListener("resize", this.resizeFunc);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunc);
    if(this.graph) {
      // this.graph.getNodes().forEach(node => {
      //   node.getKeyShape().stopAnimate();
      // });
    }
  }
  mouseDownHandle =(config: any) =>  {
    this.graph.dnd.startDrag(config);
  };

  // 隐藏属性面板
   hidePanel = () => { 
      this.handleModalVisible(false);
  }
  
  handleModalVisible(modalVisible){
    this.setState({modalVisible:modalVisible})
  }
   uploadXml(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = (ev.target as FileEventTarget).files[0];
    const reader = new FileReader()
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) {
        const xml = event.target.result as string;
        this.graph.render(xml);
      }
    }
    reader.readAsText(file); // you could also read images and other binaries
  }

  onItemClick = (id: string, data: any) => {
    debugger
    const node = this.graph.graphModel.nodesMap[id];
    const edge = this.graph.graphModel.edgesMap[id];
    if (node) {
      let edgesMaps = this.graph.graphModel.edgesMap;
      let properties = new Array();
      let count = 0;
      let seqflow = {};
      for(var key in edgesMaps){
        if(edgesMaps[key].model.sourceNodeId===id){
          const targetNode = this.graph.graphModel.nodesMap[edgesMaps[key].model.targetNodeId];
          properties.push({title:targetNode.model?.text?.value,seqflow:key});
          let item = new Array();
          item.push({})
          seqflow[key+"_item_"+count]=item;
          count++;
        }
      }
      if(properties && properties.length >0){
        seqflow["condition"] = properties;
        node.model.setProperties(Object.assign(node.model.properties,seqflow));
      }
      if(node.model.text){
        node.model.setProperties(Object.assign(node.model.properties, {title:node.model?.text?.value}));
      }
      this.setState({selectedModel: { ...node.model }});
    } else if (edge) {
      this.setState({selectedModel: { ...edge.model }});
    }
  }
  // 更新属性
   onItemCfgChange = (id: string, data: any) => {
    const node = this.graph.graphModel.nodesMap[id];
    const edge = this.graph.graphModel.edgesMap[id];
    if (node) {
      debugger
      switch(node.model.type){
        case BpmnElements.PAGATEWAY:
          const flowIds =  seqflowId(data);
          if(flowIds && flowIds.length > 0) {
            let _self = this;
            flowIds.forEach((flowId)=>{
              const edge = _self.graph.graphModel.edgesMap[flowId];
              if(edge){
               const  expression = seqflowValue(data,flowId); 
               if(expression){
                edge.model.setProperties(Object.assign(edge.model.properties,expression));
               }else{//删除操作
                let properties = delflowId(edge.model.properties);
                edge.model.properties=properties;
               }
              }
            })
          }
          break;
          case BpmnElements.SYSTEM:
          let  extensionElements = ExtensionElements(data);
          node.model.setProperties(Object.assign(node.model.properties, extensionElements));
          break;
      }
      node.model.setProperties(Object.assign(node.model.properties, data));
      this.graph.updateText(id,node.model?.properties?.title)
      this.setState({selectedModel: {  ...node.model }});
    } else if (edge) {
      edge.model.setProperties(Object.assign(edge.model.properties, data));
      this.setState({selectedModel: {  ...edge.model }});
    }
  }

  render() {
    const height = this.props.height;
    const { isView,mode,users,groups,lang } = this.props;
    const { selectedModel,processModel } = this.state;
    const { signalDefs, messageDefs } = processModel;
    const i18n = locale[lang.toLowerCase()];
    const readOnly = mode !== "edit";
    return (
      <LangContext.Provider value={{i18n,lang}}>
        <div className="root">
          <Row>
            <Col span={24}> <span
        id="upload-xml"
        title="上传 XML"
      >
        <input type="file" className="upload" onChange={(ev) => this.uploadXml(ev)} />
        <i>上传xml</i>
      </span></Col>
          </Row>
          <Row>
            <Col span={24} >
            <Panel mouseDownHandle={this.mouseDownHandle} />
            <div ref={this.pageRef} className="canvasPanel" style={{height,width:isView?'100%':'100%',borderBottom:isView?0:null,display:'block'}}/>
            </Col>
          </Row>
        </div>
        { this.state.modalVisible ? <div >
        {<DetailPanel ref={this.detailPanelRef}
                                      height={height-100}
                                      model={selectedModel}
                                      readOnly={readOnly}
                                      users={users}
                                      groups={groups}
                                      signalDefs={signalDefs}
                                      messageDefs={messageDefs}
                                      hidePanel={()=>{this.hidePanel()}}
                                      onChange={(key,val)=>{this.onItemCfgChange(key,val)}} />}
      </div> : ''} 
      </LangContext.Provider>
    );
  }
}
