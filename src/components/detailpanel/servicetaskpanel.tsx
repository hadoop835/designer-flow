import   "./index.less";
import React, {useContext,useEffect} from "react"; 
import { Input ,Form,Card,Row, Col,Select,Space,Button,Radio} from "antd";
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import LangContext from "../../util/context";
const { Option } = Select;
/**
 * 开始属性
 */
export interface ServiceTaskPanelProps {
  height: number;
  model: any;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
/**
 * 开始面板
 */
const ServiceTaskPanel: React.FC<ServiceTaskPanelProps>  = ({height,model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  return (
       <Form
        size="large"
        key={model.id}
        layout="inline"
        initialValues={model.properties}
        onValuesChange={onChange}
      >
      <Card  title={
        <Row>
        <Col span={4} ><Form.Item label="节点设置" name="title">
         <Input value={model.text} style={{width:"380px"}}/>
       </Form.Item></Col>
       <Col span={4}><Form.Item label="执行类" name="-smart:class">
       <Select placeholder="选择执行执行类" >
            <Option value="all">1</Option>
            <Option value="any">2</Option>  
         </Select>
       </Form.Item>
       </Col>
       <Col span={8}><Form.Item  label="事件类型"  name={"event"} rules={[{ required: true, message: '选择表不能空' }]}>
                                    <Select placeholder="选择监听类型" >
                                        <Option value="PROCESS_START">1</Option>
                                        <Option value="PROCESS_END">2</Option>
                                        {/* <Option value="ACTIVITY_START">1</Option>
                                        <Option value="ACTIVITY_EXECUTE">2</Option>
                                        <Option value="ACTIVITY_END">1</Option>
                                        <Option value="ACTIVITY_TRANSITION_SELECT">2</Option>
                                        <Option value="TRANSITION_HIT">1</Option>
                                        <Option value="TRANSITION_START">2</Option>
                                        <Option value="TRANSITION_EXECUTE">1</Option>
                                        <Option value="TRANSITION_END">2</Option> */}
                                    </Select>
                                </Form.Item></Col>
       <Col span={8}><Form.Item label="事件类"  name={"class"} rules={[{ required: true, message: '选择字段不能为空' }]}>
                                  <Select placeholder="选择监听类" >
                                        <Option value="all">1</Option>
                                        <Option value="any">2</Option>  
                                   </Select>
                                </Form.Item></Col>
        </Row>
      } style={{height:height-130,width:'100%'}}>
      <Row style={{marginTop:"10px"}} >
            <Col span={24} >
               <div className="container-gateway">
                  <div className="container-gateway-subscript">
                    <div className="rect"></div>
                    <div className="desc">1</div>
                  </div>
                  <div>
                  <div className="container-gateway-title">配置属性</div>
                  <div className="container-gateway-tree">
                  <ul>
                    <Form.List name={"prop"} >
                        {(fields, { add, remove }) => (
                          <>
                             {fields.map(field => (
                              <li key={field.key}>
                              <Row>
                                <Col span={6}><Form.Item {...field} label="属性名"  name={[field.name, 'name']} rules={[{ required: true, message: '选择表不能空' }]}>
                                 <Input ></Input>
                                </Form.Item></Col>
                                <Col span={6}><Form.Item {...field} label="属性值"  name={[field.name, 'value']} rules={[{ required: true, message: '选择字段不能为空' }]}>
                                 <Input ></Input>
                                </Form.Item></Col>
                                <Col span={6}><DeleteOutlined onClick={() => remove(field.name)} /><PlusCircleOutlined onClick={() => add()} /></Col>
                                <Col span={6}></Col>
                              </Row>
                              </li>
                             ))}
                             <li><a  onClick={() => add()}>新建属性</a></li>
                          </>
                          )}
                      </Form.List>
                  </ul>
                  </div>
                  </div>
                </div> 
            </Col>
            </Row>
     </Card>
      </Form>
  )
};
export default ServiceTaskPanel;
