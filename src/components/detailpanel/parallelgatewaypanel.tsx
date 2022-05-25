import   "./index.less";
import React, {useContext,useEffect} from "react"; 
import { Input ,Form,Card,Row, Col,Select,Space,Button,Radio} from "antd";
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import LangContext from "../../util/context";
const { Option } = Select;
/**
 * 开始属性
 */
export interface ParallelGatewayProps {
  height: number;
  model: any;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
/**
 * 开始面板
 */
const ParallelGatewayPanel: React.FC<ParallelGatewayProps>  = ({height,model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['startEvent'];   
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
        <Col span={8} ><Form.Item label="节点设置" name="title">
         <Input value={model.text} style={{width:"380px"}}/>
       </Form.Item></Col>
       <Col span={4}><Form.Item label="超时时间(s)" name="-timeout">
         <Input value={model.properties.timeout} />
       </Form.Item></Col>
       <Col span={4}><Form.Item label="程池名称" name="-poolName">
         <Input value={model.properties.poolName} />
       </Form.Item></Col>
       <Col span={4}><Form.Item label="超时跳过" name="-skipTimeoutExp">
          <Radio.Group  buttonStyle="solid">
          <Radio.Button value="false">否</Radio.Button>
          <Radio.Button value="true">是</Radio.Button>
          </Radio.Group>
       </Form.Item></Col>
       <Col span={4}><Form.Item label="执行策略" name="-strategy">
         <Select placeholder="选择执行策略" >
            <Option value="all">执行所有</Option>
            <Option value="any">最快的任意一个</Option>  
         </Select>
       </Form.Item></Col>
        </Row>
      } style={{height:height-130,width:'100%'}}>
    
       {
         model.properties.condition !=null?model.properties.condition.map((cond,index) => {
          const {title,seqflow} = cond; 
          const item = `${seqflow}`+"_item_"+`${index}`
          return ( 
            <Row style={{marginTop:"10px"}} key={index}>
            <Col span={24} >
               <div className="container-gateway">
                  <div className="container-gateway-subscript">
                    <div className="rect"></div>
                    <div className="desc">{index+1}</div>
                  </div>
                  <div>
                  <div className="container-gateway-title">{title}</div>
                  <div className="container-gateway-tree">
                  <ul>
                    <Form.List name={item} >
                        {(fields, { add, remove }) => (
                          <>
                             {fields.map(field => (
                              <li key={field.key}>
                              <Row>
                                <Col span={6}><Form.Item {...field}  name={[field.name, 'table']} rules={[{ required: true, message: '选择表不能空' }]}>
                                <Select placeholder="选择表" >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                  Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                              </Select>
                                </Form.Item></Col>
                                <Col span={6}><Form.Item {...field}  name={[field.name, 'field']} rules={[{ required: true, message: '选择字段不能为空' }]}>
                                <Select placeholder="选择字段" >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                  Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                              </Select>
                                </Form.Item></Col>
                                <Col span={6}><Form.Item {...field} name={[field.name, 'expression']} rules={[{ required: true, message: '选择表达式不能为空' }]}>
                                <Select placeholder="选择表达式" >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                  Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                              </Select>
                                </Form.Item></Col>
                                <Col span={6}><DeleteOutlined onClick={() => remove(field.name)} /><PlusCircleOutlined onClick={() => add()} /></Col>
                              </Row>
                              </li>
                             ))}
                             <li><a  onClick={() => add()}>新建条件组</a></li>
                          </>
                          )}
                      </Form.List>
                  </ul>
                  </div>
                  </div>
                </div> 
            </Col>
            </Row>
          );
         }):''
       }
     </Card>
      </Form>
  )
};
export default ParallelGatewayPanel;
