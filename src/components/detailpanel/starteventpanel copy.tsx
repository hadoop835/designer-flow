import   "./index.less";
import React, {useContext} from "react"; 
import { Input ,Form,Card,Row, Col,Select,Space} from "antd";
import LangContext from "../../util/context";
const { Option } = Select;
/**
 * 开始属性
 */
export interface StartEventProps {
  height: number;
  model: any;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
/**
 * 开始面板
 */
const StartEventPanel: React.FC<StartEventProps>  = ({height,model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['startEvent']; 
  console.log(model);
  return (
       <Form
        size="large"
        key={model.id}
        layout="inline"
        initialValues={model.properties}
        onValuesChange={onChange}
      >
      <Card  title={
      <Form.Item label="节点设置" name="name">
         <Input value={model.properties.name} style={{width:"380px"}}/>
       </Form.Item>
      } style={{height:height-130,width:'100%'}}>
    
       {
         model.properties.condition !=null?model.properties.condition.map((cond,index) => {
          const {title} = cond; 
          return (
            <Row>
            <Col span={24}>
               <div className="container-gateway">
                  <div className="container-gateway-subscript">
                    <div className="rect"></div>
                    <div className="desc">{index+1}</div>
                  </div>
                  <div>
                  <div className="container-gateway-title">{title}</div>
                  <div className="container-gateway-tree">
                  <ul>
                    <li>
                    <Row>
                      <Col span={6}><Form.Item label="" name="name">
                      <Select placeholder="选择表" >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                      </Form.Item></Col>
                      <Col span={6}><Form.Item label="" name="name">
                      <Select placeholder="选择字段" >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                      </Form.Item></Col>
                      <Col span={6}><Form.Item label="" name="name">
                      <Select placeholder="选择表达式" >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                      </Form.Item></Col>
                      <Col span={6}></Col>
                    </Row>
                    </li>
                    <li>
                      <span>新建条件组</span>
                    </li>
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
export default StartEventPanel;
