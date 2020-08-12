import { Modal } from 'antd';

type ModalAction = 'ok' | 'cancel' | 'close';
export function createPromisedConfirmation(text: string | React.ReactNode): Promise<ModalAction> {
  return new Promise<ModalAction>((resolve) => {
    Modal.confirm({
      title: '提示',
      content: text,
      centered: true,
      cancelText: '取消',
      okText: '确定',
      className: 'ro-confirm-wrap',
      onCancel: () => resolve('cancel'),
      onOk: () => resolve('ok'),
    });
  });
}
