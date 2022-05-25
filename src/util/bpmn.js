function tab(len){
  return [...Array(len)].map(a => " ").join('')
}
export function exportXML(json,canvas,createFile = true) {
  const id = canvas.id || "flow";
  const name = canvas.name || "flow";
  let dataObjs = "";
  canvas.dataObjs.forEach(s => {
    dataObjs += `${tab(4)}<dataObject id="${s.id}" name="${s.name}" itemSubjectRef="xsd:${s.type}"></dataObject>\n`;
  });
  let signals = "";
  canvas.signalDefs.forEach(s => {
    signals += `${tab(2)}<signal id="${s.id}" name="${s.name}" flowable:scope="${s.scope}"></signal>\n`;
  });
  let messages = "";
  canvas.messageDefs.forEach(s => {
    messages += `${tab(2)}<message id="${s.id}" name="${s.name}"></message>\n`;
  });
  let BPMNShape = ``;
  let BPMNEdge = ``;

  let processXML = `${tab(2)}<process id="${id}" name="${name}" isExecutable="true">\n`;
  processXML += dataObjs;
  json.nodes.forEach(node => {
    BPMNShape += `${tab(6)}<bpmndi:BPMNShape bpmnElement="${node.id}" id="BPMNShape_${node.id}">\n`+
      `${tab(8)}<omgdc:Bounds width="${node.size[0]}" height="${node.size[1]}" x="${node.x}" y="${node.y}"></omgdc:Bounds>\n`+
      `${tab(6)}</bpmndi:BPMNShape>\n`;
    let javaClass = "";
    switch (node.clazz) {
      case 'start':
        processXML += `${tab(4)}<startEvent id="${node.id}" name="${node.label}"></startEvent>\n`;
        break;
      case 'end':
        processXML += `${tab(4)}<endEvent id="${node.id}" name="${node.label}"></endEvent>\n`;
        break;
      case 'javaTask': {
        if(node.javaClass){
          javaClass = `smart:class="${node.javaClass}"`;
        }
        processXML += `${tab(4)}<serviceTask id="${node.id}" name="${node.label}" ${javaClass}></serviceTask>\n`;
        break;
      }
      case 'receiveTask':
        if(node.javaClass){
          javaClass = `smart:class="${node.javaClass}"`;
        }
        processXML += `${tab(4)}<receiveTask id="${node.id}" name="${node.label}" ${javaClass}></receiveTask>\n`;
        break;
      case 'mailTask': {
        let to = `${tab(8)}<flowable:field name="to">\n`;
        to += `${tab(10)}<flowable:string><![CDATA[${node.to}]]></flowable:string>\n`;
        to += `${tab(8)}</flowable:field>\n`;
        let subject = `${tab(8)}<flowable:field name="subject">\n`;
        subject += `${tab(10)}<flowable:string><![CDATA[${node.subject}]]></flowable:string>\n`;
        subject += `${tab(8)}</flowable:field>\n`;
        let text = `${tab(8)}<flowable:field name="text">\n`;
        text += `${tab(10)}<flowable:string><![CDATA[${node.content}]]></flowable:string>\n`;
        text += `${tab(8)}</flowable:field>\n`;
        let extension = `${tab(6)}<extensionElements>\n${to}${subject}${text}${tab(6)}</extensionElements>\n`;
        processXML += `${tab(4)}<serviceTask id="${node.id}" name="${node.label}" flowable:type="mail">\n${extension}${tab(4)}</serviceTask>\n`;
        break;
      }
      case 'gateway': 
        if(node.javaClass){
          javaClass = `smart:class="${node.javaClass}"`;
        }
        processXML += `${tab(4)}<exclusiveGateway id="${node.id}" name="${node.label}"  ${javaClass}></exclusiveGateway>\n`;
        break;
      case 'exclusiveGateway':
        if(node.javaClass){
          javaClass = `smart:class="${node.javaClass}"`;
        }
        processXML += `${tab(4)}<exclusiveGateway id="${node.id}" name="${node.label}" ${javaClass}></exclusiveGateway>\n`;
        break;
      case 'parallelGateway':
        let timeout = "";
        let strategy = "";
        let poolName = "";
        if(node.timeout){
          timeout = `timeout="${node.timeout}"`;
        }
        if(node.strategy){
          strategy = `strategy="${node.strategy}"`;
        }
        if(node.poolName){
          poolName = `poolName="${node.poolName}"`;
        }
        processXML += `${tab(4)}<parallelGateway id="${node.id}" name="${node.label}" ${timeout} ${strategy} ${poolName}></parallelGateway>\n`;
        break;
      case 'inclusiveGateway':
        processXML += `${tab(4)}<inclusiveGateway id="${node.id}" name="${node.label}"></inclusiveGateway>\n`;
        break;
      default:
        break;
    }
  });
  json.edges.forEach(edge => {
    BPMNEdge += `${tab(6)}<bpmndi:BPMNEdge bpmnElement="${edge.source}_${edge.sourceAnchor}-${edge.target}_${edge.targetAnchor}" `+
      `id="BPMNEdge_${edge.source}_${edge.sourceAnchor}-${edge.target}_${edge.targetAnchor}">\n`+
        `${tab(8)}<omgdi:waypoint x="${edge.startPoint.x}" y="${edge.startPoint.y}"></omgdi:waypoint>\n`+
        `${tab(8)}<omgdi:waypoint x="${edge.endPoint.x}" y="${edge.endPoint.y}"></omgdi:waypoint>\n`+
      `${tab(6)}</bpmndi:BPMNEdge>\n`;
    let condition = "";
    if(edge.coditionExpression){
      condition = `${tab(6)}<conditionExpression type="mvel"><![CDATA[${edge.coditionExpression}]]></conditionExpression>\n`;
    }
    processXML += `${tab(4)}<sequenceFlow id="${edge.source}_${edge.sourceAnchor}-${edge.target}_${edge.targetAnchor}" sourceRef="${edge.source}" targetRef="${edge.target}">${condition}</sequenceFlow>\n`;
  });
  processXML += `${tab(2)}</process>\n`;

  let BPMNDiagram = `${tab(2)}<bpmndi:BPMNDiagram id="BPMNDiagram_${id}">\n`+
      `${tab(4)}<bpmndi:BPMNPlane bpmnElement="${id}" id="BPMNPlane_${id}">\n${BPMNShape}${BPMNEdge}${tab(4)}</bpmndi:BPMNPlane>\n`+
      `${tab(2)}</bpmndi:BPMNDiagram>\n`;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" `+
    `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" `+
    `xmlns:xsd="http://www.w3.org/2001/XMLSchema" `+
    `xmlns:smart="http://smartengine.org/schema/process" `+
    `xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" `+
    `xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" `+
    `xmlns:di="http://www.omg.org/spec/DD/20100524/DI" `+
    `typeLanguage="http://www.w3.org/2001/XMLSchema" `+
    `expressionLanguage="http://www.w3.org/1999/XPath" `+
    `targetNamespace="smart">\n`;
  xml += signals;
  xml += messages;
  xml += processXML;
  xml += BPMNDiagram;
  xml += `</definitions>`;
  if(createFile){
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8;' });
    const filename = `${name}.xml`;
    let link = document.createElement('a');
    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  return xml;
}
