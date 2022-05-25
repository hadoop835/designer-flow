// import LogicFlow from '@logicflow/core';
import StartEvent, { StartEventModel, StartEventView } from './events/StartEvent';
import EndEvent, { EndEventView, EndEventModel } from './events/EndEvent';
import ExclusiveGateway, { ExclusiveGatewayView, ExclusiveGatewayModel } from './gateways/ExclusiveGateway';
import InclusiveGateway, { InclusiveGatewayView, InclusiveGatewayModel } from './gateways/InclusiveGateway';
import ParallelGateway, { ParallelGatewayView, ParallelGatewayModel } from './gateways/ParallelGateway';
import UserTask, { UserTaskView, UserTaskModel } from './tasks/UserTask';
import ServiceTask, { ServiceTaskView, ServiceTaskModel } from './tasks/ServiceTask';
import ReceiveTask, { ReceiveTaskView, ReceiveTaskModel } from './tasks/ReceiveTask';
import SequenceFlow, { SequenceFlowView, SequenceFlowModel } from './flow/SequenceFlow';
import { theme } from './constant';

// todo: name
class BpmElement {
  static pluginName = 'BpmnElement';
  constructor({ lf }) {
    lf.setTheme(theme);
    lf.register(StartEvent);
    lf.register(EndEvent);
    lf.register(ExclusiveGateway);
    lf.register(ParallelGateway);
    lf.register(InclusiveGateway);
    lf.register(UserTask);
    lf.register(ServiceTask);
    lf.register(ReceiveTask);
    // 支持自定义bpmn元素的连线
    if (!lf.options.customBpmnEdge) {
      lf.register(SequenceFlow);
      lf.setDefaultEdgeType('bpmn:sequenceFlow');
    }
  }
}

export {
  BpmElement,
  StartEventModel,
  StartEventView,
  EndEventView,
  EndEventModel,
  ExclusiveGatewayView,
  ExclusiveGatewayModel,
  InclusiveGatewayView, 
  InclusiveGatewayModel,
  ParallelGatewayView,
  ParallelGatewayModel, 
  UserTaskView,
  UserTaskModel,
  ServiceTaskView,
  ServiceTaskModel,
  ReceiveTaskView,
  ReceiveTaskModel,
  SequenceFlowView,
  SequenceFlowModel,
};
