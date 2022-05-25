import {MiniMap} from '@logicflow/extension';
type FileEventTarget = EventTarget & { files: FileList };
/**
 * 
 */
const ExtToolbarMiniMap =
    {
        key: 'toolbar-minimap',
        iconClass: 'custom-minimap',
        title: '',
        text: '导航',
        onMouseEnter: (lf, ev) => {
          const position = lf.getPointByClient(ev.x, ev.y);
          MiniMap.show(position.domOverlayPosition.x - 120, position.domOverlayPosition.y + 35);
        },
        onClick: (lf, ev) => { 
          const position = lf.getPointByClient(ev.x, ev.y);
          MiniMap.show(position.domOverlayPosition.x - 120, position.domOverlayPosition.y + 35);
        },
      }
     /**
      * 下载文件
      * @param filename 文件名称
      * @param text 
      */
    export  function download(filename: string, text: string) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
/**
 * 下载xml并保存到服务器
 */
const ExtDownloadXml = {
    key: 'toolbar-downloadxml',
    iconClass: 'custom-downloadxml',
    title: '保存',
    text: '保存',
    onClick: (lf, ev) => { 
        const data = lf.getGraphData() as string;
        download('logic-flow.xml', data);
    },
}
/**
 * 
 */
const ExtDownloadImg = {
    key: 'toolbar-downloadimg',
    iconClass: 'custom-downloadimg',
    title: '下载图片',
    text: '下载图片',
    onClick: (lf, ev) => { 
        lf.getSnapshot();
    },
}
export{
    ExtToolbarMiniMap,
    ExtDownloadXml,
    ExtDownloadImg
}
export default ExtToolbarMiniMap;
 
