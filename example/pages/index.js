import Designer from "../../dist";
import React, {Component} from "react";
import {Button,Modal,Dropdown,Menu} from 'antd'
import 'antd/dist/antd.less'
class Demo extends Component {
  constructor(props){
    super(props);
    this.wfdRef = React.createRef();
  }

  state = {
    modalVisible: false,
    selectedLang: 'zh',
  };

  langMenu = (
    <Menu onClick={(lang)=>{this.changeLang(lang)}}>
      <Menu.Item key="zh">
            <span role="img" >
              {"🇨🇳"}
            </span>
        {" 简体中文"}
      </Menu.Item>
      <Menu.Item key="en">
            <span role="img" >
              {"🇬🇧"}
            </span>
        {" English"}
      </Menu.Item>
    </Menu>
  );

  handleModalVisible(modalVisible){
    this.setState({modalVisible})
  }

  changeLang({key}){
    this.setState({selectedLang:key})
  }

  render(){
    const data = {
      nodes: [
        {
          id: 10,
          type: 'rect',
          x: 100,
          y: 110,
          text: '审批通过'
        },
        {
          id: 20,
          type: 'rect',
          x: 300,
          y: 110,
          text: '审批中'
        },
        {
          id: 30,
          type: 'rect',
          x: 500,
          y: 110,
          text: '未开始'
        }
      ],
      edges: [
        {
          type: 'process',
          sourceNodeId: 10,
          targetNodeId: 20,
          startPoint: {
            id: '150-110',
            x: 150,
            y: 110
          },
          endPoint: {
            id: '250-110',
            x: 250,
            y: 110
          },
          properties: {
            isExecuted: true
          }
        },
        {
          type: 'process',
          sourceNodeId: 20,
          targetNodeId: 30,
          startPoint: {
            id: '350-110',
            x: 350,
            y: 110
          },
          endPoint: {
            id: '450-110',
            x: 450,
            y: 110
          },
          properties: {
            isExecuted: false
          }
        }
      ]
    };

    const data1 = {
      nodes: [{ id: 'startNode1', x: 50, y: 200, label: '', clazz: 'start', },
        { id: 'startNode2', x: 50, y: 320, label: '', clazz: 'timerStart', },
        { id: 'taskNode1', x: 200, y: 200, label: '主任审批', clazz: 'userTask',  },
        { id: 'taskNode2', x: 400, y: 200, label: '经理审批', clazz: 'scriptTask', active:true },
        { id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', clazz: 'gateway',  },
        { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', clazz: 'receiveTask', },
        { id: 'catchNode1', x: 600, y: 200, label: '等待结束', clazz: 'signalCatch', },
        { id: 'endNode', x: 600, y: 320, label: '', clazz: 'end', }],
      edges: [{ source: 'startNode1', target: 'taskNode1', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
        { source: 'startNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
        { source: 'taskNode1', target: 'catchNode1', sourceAnchor:0, targetAnchor:0, clazz: 'flow' },
        { source: 'taskNode1', target: 'taskNode2', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
        { source: 'taskNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' },
        { source: 'taskNode2', target: 'taskNode1', sourceAnchor:2, targetAnchor:2, clazz: 'flow' },
        { source: 'gatewayNode', target: 'taskNode3', sourceAnchor:2, targetAnchor:0, clazz: 'flow' },
        { source: 'gatewayNode', target: 'endNode', sourceAnchor:1, targetAnchor:2, clazz: 'flow'},
        { source: 'taskNode3', target: 'endNode', sourceAnchor:1, targetAnchor:1, clazz: 'flow' },
        { source: 'catchNode1', target: 'endNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' }]
    };

    const candidateUsers = [{id:'1',name:'Tom'},{id:'2',name:'Steven'},{id:'3',name:'Andy'}];
    const candidateGroups = [{id:'1',name:'Manager'},{id:'2',name:'Security'},{id:'3',name:'OA'}];
    const height = window.screen.height;
    const { modalVisible,selectedLang } = this.state;
    return (
      <div>
        {/* <Button style={{float:'right',marginTop:"18px",marginRight:6}} onClick={()=>this.wfdRef.current.graph.saveXML()}>导出XML</Button>
        <Button style={{float:'right',marginTop:"18px",marginRight:6}} onClick={()=>this.handleModalVisible(true)}>查看流程图</Button> */}
        <Designer ref={this.wfdRef}   height={height} mode={"edit"} users={candidateUsers} groups={candidateGroups} lang={selectedLang} />
        <Modal title="查看流程图" visible={modalVisible} onCancel={()=>this.handleModalVisible(false)} width={800} maskClosable={false} footer={null} destroyOnClose bodyStyle={{height}} >
          <Designer data={data1} height={height-40} isView />
        </Modal>
      </div>
    );
  }
}

export default Demo;
