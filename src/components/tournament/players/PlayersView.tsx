import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { FaSearch } from 'react-icons/fa';
import Avatar from 'react-avatar';

interface Player {
  id: string;
  name: string;
}

export default function PlayersView(props: {
  handleDragEnd: OnDragEndResponder;
  tournamentPlayers: Player[];
  userPlayers: Player[];
  openModal: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}) {
  const { handleDragEnd, tournamentPlayers, userPlayers, openModal } = props;
  const filteredPlayers = userPlayers
    ? userPlayers.filter((player) =>
        player.name.toLowerCase().includes(props.searchValue.toLowerCase())
      )
    : [];

  return (
    <div className='bg-white mx-auto'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex justify-between w-full flex-col md:flex-row'>
          {['tournament', 'user'].map((type, index) => (
            <div key={index} className={'mx-10 my-2'}>
              {type === 'tournament' && (
                <h2 className=' font-bold text-center text-xl pb-5 border-b-2 border-gray-700'>
                  {'Players in tournament'}
                </h2>
              )}

              {type === 'user' && (
                <>
                  <button
                    type='button'
                    className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
                    onClick={openModal}
                  >
                    Add Player
                  </button>
                  <div className='relative w-full mx-auto my-4'>
                    <FaSearch className='absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 text-2xl' />
                    <input
                      type='text'
                      className='w-full px-3 py-2 pl-10 text-base border border-gray-300 rounded-lg transition duration-300'
                      placeholder='Search player...'
                      value={props.searchValue}
                      onChange={(e) => props.setSearchValue(e.target.value)}
                    />
                  </div>
                </>
              )}

              <Droppable droppableId={type}>
                {(provided) => (
                  <div
                    className='w-80 column shadow p-3 rounded-md'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className='table'>
                      {(type === 'tournament'
                        ? tournamentPlayers
                        : filteredPlayers
                      )
                        .filter(
                          (player) =>
                            type === 'tournament' ||
                            player.name
                              .toLowerCase()
                              .includes(props.searchValue.toLowerCase())
                        )
                        .map((player, idx) => (
                          <Draggable
                            key={player.id}
                            draggableId={player.id}
                            index={idx}
                          >
                            {(provided) => (
                              <div
                                className={
                                  'flex justify-between py-2 border-b border-gray-300 font-bold hover:bg-gray-100 rounded-sm mb-1 transition duration-200 last:border-b-0'
                                }
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Avatar
                                    name={player.name}
                                    size='40'
                                    round={true}
                                    style={{ marginRight: '10px' }}
                                  />
                                  <span>{player.name}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
