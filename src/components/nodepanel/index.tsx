import React, { Component } from "react";
import styles from './index.less'
import {Card,Tooltip} from "antd";

type ShapeType = {
  type: string;
  text: string;
  className:string;
};

type IProps = {
  mouseDownHandle: ({
    type,
    text,
    className,
  }: ShapeType) => void;
};

type IState = {
  startEventList:ShapeType[];
  endEventList:ShapeType[];
  gatewayList:ShapeType[];
  taskList:ShapeType[];
};

export default class Panel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      startEventList:[{
        type: 'bpmn:startEvent',
        text: '开始',
        className:'pattern-start',
      }],
      endEventList:[{
        type: 'bpmn:endEvent',
        text: '结束',
        className:'pattern-end',
      }],
      gatewayList:[{
        type: 'bpmn:parallelGateway',
        text: '并行网关',
        className:'pattern-parallel',
      },
      {
        type: 'bpmn:exclusiveGateway',
        text: '排他网关',
        className:'pattern-exclusive',
      },
      {
        type: 'bpmn:inclusiveGateway',
        text: '包容网关',
        className:'pattern-inclusive',
      }],
      taskList:[
        {
          type: 'bpmn:serviceTask',
          text: '系统任务',
          className:'pattern-serviceTask',
        },
        {
          type: 'bpmn:receiveTask',
          text: '接收任务',
          className:'pattern-receiveTask',
        }
      ],
    };
  }

  mouseDown({ type, text,className }: ShapeType) {
    const { mouseDownHandle } = this.props;
    mouseDownHandle({
      type,
      text,
      className
    });
  }

  render() {
    const { startEventList,endEventList,gatewayList,taskList } = this.state;
    return (
      <div className={styles.pattern}>
        <Card  headStyle={{textAlign:'center'}}  bodyStyle={{textAlign:'center'}} title='开始' style={{ width: 180}}>
        {startEventList.map(shape => { 
          const { type, text,className } = shape; 
          return (
            <div className={styles.panelitem} key={type} >
               <Tooltip placement="top" title={text}>
              <div
                className={`${className}`}
                onMouseDown={() => { this.mouseDown(shape); }}
              />
              </Tooltip>
            </div>
          );
        })}
        </Card>
        <Card  headStyle={{textAlign:'center'}}  bodyStyle={{textAlign:'center'}} title='网关' style={{ width: 180}}>
        {gatewayList.map(shape => { 
          const { type, text,className } = shape; 
          return (
            <div className={styles.panelitem} key={type} >
               <Tooltip placement="top" title={text}>
              <div
                className={`${className}`}
                onMouseDown={() => { this.mouseDown(shape); }}
              />
              </Tooltip>
            </div>
          );
        })}
        </Card>
        <Card  headStyle={{textAlign:'center'}}  bodyStyle={{textAlign:'center'}} title='任务' style={{ width: 180}}>
        {taskList.map(shape => { 
          const { type, text,className } = shape; 
          return (
            <div className={styles.panelitem} key={type} >
               <Tooltip placement="top" title={text}>
              <div
                className={`${className}`}
                onMouseDown={() => { this.mouseDown(shape); }}
              />
              </Tooltip>
            </div>
          );
        })}
        </Card>
        <Card  headStyle={{textAlign:'center'}}  bodyStyle={{textAlign:'center'}} title='结束' style={{ width: 180}}>
        {endEventList.map(shape => { 
          const { type, text,className } = shape; 
          return (
            <div className={styles.panelitem} key={type} >
              <Tooltip placement="top" title={text}>
              <div
                className={`${className}`}
                onMouseDown={() => { this.mouseDown(shape); }}
              />
              </Tooltip>
            </div>
          );
        })}
        </Card>
      </div>
    );
  }
}