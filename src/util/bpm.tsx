import { duration } from "moment";

export enum BpmnElements {
    START = 'bpmn:startEvent',
    END = 'bpmn:endEvent',
    GATEWAY = 'bpmn:exclusiveGateway',
    INGATEWAY='bpmn:inclusiveGateway',
    PAGATEWAY='bpmn:parallelGateway',
    USER = 'bpmn:userTask',
    SYSTEM = 'bpmn:serviceTask',
    RECEIVE = 'bpmn:receiveTask',
    FLOW = 'bpmn:sequenceFlow',
  }
/**
   * 获取条件id
   * @param json 
   */
   export function seqflowValue(json,flowId){
    let condition;
    let result;
    try {
    Object.entries(json).forEach(([key, value]) => {
        if(key.indexOf(flowId+'_item_') != -1){
         if(Array.isArray(value)){ 
            value.forEach((expression)=>{
              if(expression && expression.table && expression.field && expression.expression){
                let exp = expression.table+","+expression.field+","+expression.expression;
                if(result){
                    result += exp;
                }else{
                    result = exp;
                }
              }
            })
         }
           throw new Error("seqflowId break");
        }
    });
   }catch(e){
   }
   
   if(result){
      condition={"bpmn:conditionExpression":{"-type":"mvel","#cdata":result}};
   }
    return  condition;
  }
  /**
   * 
   * @param json 删除条件
   */
  export function  delflowId(json){
    var properties ={};
    Object.entries(json).forEach(([key, value]) => {
      if(key != "bpmn:conditionExpression"){
        properties [key] = value;
      }
  });
   return properties;
  }
  /**
   * 获取条件id
   * @param json 
   */
  export function seqflowId(json){
    let id = new Array(); 
    Object.entries(json).forEach(([key, value]) => {
        if(key.indexOf('_item_') != -1){
           id.push(key.substring(0,key.indexOf("_item_")));
        }
    });
    return id;
  }

/**
 * 属性值
   * 获取条件id
   * @param json 
   */
 export function PropertiesValue(json){
    const result = [];
    try {
    Object.entries(json).forEach(([key, value]) => {
        if(key.indexOf('prop') != -1){
         if(Array.isArray(value)){ 
            let count = 0;
            value.forEach((prop)=>{
              if(prop && prop.name && prop.value){
                const props = {};
                props["-name"]=prop.name;
                props["-value"]=prop.value;
                const smarts = {};
                smarts["smart:value"]=props;
                result[count++]=smarts;
              }
            })
         }
           throw new Error("PropertiesValue break");
        }
    });
   }catch(e){
   }
    return  result;
}

/**
 * 监听器
   * 获取条件id
   * @param json 
   */
 export function ListenerValue(json){
  const listeners = {};
    Object.entries(json).forEach(([key, value]) => {
        if(key.indexOf('event') != -1){
          listeners["-event"] = value;
        }else if(  key.indexOf('class') != -1){
          listeners["-class"] = value;
        }
    });
    const smart = {};
    smart["smart:executionListener"]=listeners; 
    return  smart;
}

/**
 * 
 * @param json 扩充元素
 */
export function ExtensionElements(json){
  const extension = {};
  const   result= new Array();
  const  propertiesValue =  PropertiesValue(json);
  if(propertiesValue && propertiesValue.length > 0){
    let properties = {};
    properties["smart:properties"]=propertiesValue;
    result.push(properties);
  }
  const listenerValue = ListenerValue(json);
  if(listenerValue){
    result.push(listenerValue); 
  }
  if(result){
    extension["extensionElements"]=result; 
    return extension;
  }

}
