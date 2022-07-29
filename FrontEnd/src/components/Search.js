import ProtectedRoute from './ProtectedRoute';
import { Menu, Container, Image, Form } from 'semantic-ui-react';
import { changeEventsSearch, submitEventsSearch } from '../store/actions';
import { useSelector, useDispatch} from 'react-redux';

import '../styles/search.scss';

function SearchBar() {

  const dispatch = useDispatch();
  const { 
    searchInput
  } = useSelector((state) => state.events);

  return (
    <div className='search-container'>
      <Menu 
        inverted
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderRadius: '0',
        }}
      >
      <Menu.Item
        style={{
          width: '700px',
          height: '50px',
        }}
      >
        <Form onSubmit={()=> dispatch(submitEventsSearch())}>
          <Form.Input
            icon= 'sliders horizontal'
            placeholder='Rechercher'
            size='large'
            value={searchInput}
            onChange={(e)=> dispatch(changeEventsSearch(e.target.value))}
          />
        </Form>
          {/* <div className="searchInputs">
            <input type="text" placeholder={placeholder}/>
            <div className="searchIcon"><i class="search icon"></i></div>
          </div> */}
          {/* <div className="dataResult">
            {data.map((value, key) => {
              return <div> 
                <p>{value.title} </p>
                </div>
            })}
          </div> */}
        </Menu.Item>
      </Menu>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '20px',
          width: '700px',
          height: '400px',
          marginTop: '10px',
        }}
      >
        <Image
          src='https://picsum.photos/1080/1920' 
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '20px',
          }}
        />
      </Container>
    </div>
  );
}

export default ProtectedRoute(SearchBar);