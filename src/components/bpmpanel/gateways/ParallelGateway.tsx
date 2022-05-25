import { h, PolygonNode, PolygonNodeModel } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';

class ParallelGatewayModel extends PolygonNodeModel {
  static extendKey = 'ParallelGatewayModel';
  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `parallel_gateway_${getBpmnId()}`;
    }
    if (!data.text) {
        data.text = '';
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 40,
      };
    }
    if(!data.properties){
      data.properties={"-skipTimeoutExp":"false"}
    }else{
      data.properties["-skipTimeoutExp"]="false";
    }
    super(data, graphModel);
    this.points = [
      [25, 0],
      [50, 25],
      [25, 50],
      [0, 25],
    ];
  }
}

class ParallelGatewayView extends PolygonNode {
  static extendKey = 'ParallelGatewayNode';
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, points } = model;
    const style = model.getNodeStyle();
    return h(
      'g',
      {
        transform: `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`,
      },
      h('polygon', {
        ...style,
        x,
        y,
        points,
      }),
      h('path', {
        d:
          'm23.86131,15.07636l2.97435,0l0,9.08019l9.53258,0l0,2.83204l-9.53258,0l0,9.12155l-2.97435,0l0,-9.12155l-9.57596,0l0,-2.83204l9.57596,0l0,-9.08019z',
        ...style,
      }),
    );
  }
}

const ParallelGateway = {
  type: 'bpmn:parallelGateway',
  view: ParallelGatewayView,
  model: ParallelGatewayModel,
};

export { ParallelGatewayView, ParallelGatewayModel };
export default ParallelGateway;
