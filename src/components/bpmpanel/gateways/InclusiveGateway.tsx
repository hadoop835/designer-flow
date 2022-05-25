import { h, PolygonNode, PolygonNodeModel } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';

class InclusiveGatewayModel extends PolygonNodeModel {
  static extendKey = 'InclusiveGatewayModel';
  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `inclusive_gateway_${getBpmnId()}`;
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
    super(data, graphModel);
    this.points = [
      [25, 0],
      [50, 25],
      [25, 50],
      [0, 25],
    ];
  }
}

class InclusiveGatewayView extends PolygonNode {
  static extendKey = 'InclusiveGatewayNode';
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
          'm24.50001,39c-7.99766,0 -14.5,-6.27813 -14.5,-14.00001s6.50234,-14.00001 14.5,-14.00001s14.5,6.27813 14.5,14.00001s-6.50234,14.00001 -14.5,14.00001zm0,-25.37501c-6.50234,0 -11.78125,5.09688 -11.78125,11.37501s5.27891,11.37501 11.78125,11.37501s11.78125,-5.09688 11.78125,-11.37501s-5.27891,-11.37501 -11.78125,-11.37501z',
          ...style,
      }),
    );
  }
}

const InclusiveGateway = {
  type: 'bpmn:inclusiveGateway',
  view: InclusiveGatewayView,
  model: InclusiveGatewayModel,
};

export { InclusiveGatewayView, InclusiveGatewayModel };
export default InclusiveGateway;
