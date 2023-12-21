import { ContextModalProps } from '@mantine/modals';
import { ICreatePlayer } from '../../../../types';
import AddPlayerModalView from './AddPlayerModalView';

export function AddPlayerModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  addPlayer: (player: ICreatePlayer) => Promise<void>;
}>) {
  const savePlayer = async (values: { [field: string]: any }) => {
    const addPlayerObject: ICreatePlayer = {
      name: values.name,
      sex: values.sex,
    };
    await innerProps.addPlayer(addPlayerObject);
    context.closeModal(id);
  };

  return <AddPlayerModalView handleSubmit={savePlayer} />;
}
