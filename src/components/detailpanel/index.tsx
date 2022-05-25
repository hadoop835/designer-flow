import React, { forwardRef } from 'react'; 
import { Form, Select, Input, Button,Layout,Card} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from "./index.less";
import 'antd/dist/antd.css';
import { IDefaultModel, ISelectData } from '../../types';
import ParallelGatewayPanel from "./parallelgatewaypanel";
import ServiceTaskPanel from "./servicetaskpanel";
import {BpmnElements} from "../../util/bpm"
const { Header, Footer, Sider, Content } = Layout;

export interface DetailProps{
  height: number;
  model: any;
  users: ISelectData[];
  groups: ISelectData[];
  messageDefs: ISelectData[];
  signalDefs: ISelectData[];
  onChange: (...args: any[]) => any;
  hidePanel:(...args: any[]) => any;
  readOnly: boolean;
}
const DetailPanel = forwardRef<any, DetailProps>(({height,model,users,groups,messageDefs,signalDefs,onChange,hidePanel,readOnly = false},ref)=>{
   
  const onFormLayoutChange = (value: any, all: any) => {
     
    onChange(model.id, all,);
  }
 
  return (
    <div ref={ref} className="property-panel" style={{height}}>
      <Layout>
      <Content> 
      { model.type === BpmnElements.PAGATEWAY && <ParallelGatewayPanel model={model} onChange={onFormLayoutChange} readOnly={readOnly} height={height} key={model.id} /> }
      { model.type === BpmnElements.SYSTEM && <ServiceTaskPanel model={model} onChange={onFormLayoutChange} readOnly={readOnly} height={height} key={model.id} />}
      </Content>
      <Footer><div className="property-panel-footer">
        <Button
          className="property-panel-footer-hide"
          type="primary"
          icon={<DownOutlined/>}
          onClick={hidePanel}>
          收起
        </Button>
      </div></Footer>
    </Layout> 
    </div>
  )
});

export default DetailPanel;
