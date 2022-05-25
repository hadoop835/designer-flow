import { h, RectNodeModel, RectNode } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';
/**
 * java 接收执行任务
 */
class ReceiveTaskModel extends RectNodeModel {
  static extendKey = 'ReceiveTaskModel';
  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `receive_task_${getBpmnId()}`;
    }
    super(data, graphModel);
  }
}

class ReceiveTaskView extends RectNode {
  static extendKey = 'ReceiveTaskNode';
  getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      'svg',
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 30,
        height: 30,
        viewBox: '0 0 1274 1024',
      },
      h('path', {
        fill: style.stroke,
        d:
          'M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6c20.2 15.7 48.5 15.7 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z',
      }),
    );
  }
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    // todo: 将basic-shape对外暴露，在这里可以直接用。现在纯手写有点麻烦。
    return h('g', {}, [
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
        ...style,
      }),
      this.getLabelShape(),
    ]);
  }
}

const ReceiveTask = {
  type: 'bpmn:receiveTask',
  view: ReceiveTaskView,
  model: ReceiveTaskModel,
};

export { ReceiveTaskView, ReceiveTaskModel };
export default ReceiveTask;
