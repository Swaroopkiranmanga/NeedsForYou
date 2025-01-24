import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Navbar, Container, Form, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { Badge } from 'react-bootstrap';
import { useCart } from './CartProvider';

function NavBar() {
  const navigate = useNavigate(); 
  const searchQuery = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const { cartCount } = useCart();

  const search = async () => {
    const query = searchQuery.current.value.trim();

    // Check if the search query is empty
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8081/api/products/search?keyword=${query}`);
      console.log(res);
      setSearchResults(res.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  const display_product=(result)=>{
    navigate("/productitem",{state:{result}})
  }
  
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top" bg="primary">
        <Container fluid className="px-3">
          <Navbar.Brand href="#" className="d-flex align-items-center" style={{ paddingLeft: '100px' }}>
            <span>Needs for you👋</span>
            <Form className="d-flex ms-4" style={{ width: 'auto' }}>
              <Form.Control
                type="search"
                placeholder="Search for Products"
                className="me-2"
                aria-label="Search"
                onChange={search}
                ref={searchQuery}
                style={{ width: '500px', height: '45px' }} 
              />
              
            </Form>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0 d-flex align-items-center" navbarScroll>
              <NavDropdown title={<><FaUser className="me-2" />Login</>} id="navbarScrollingDropdown" className="mx-2">
                <NavDropdown.Item onClick={() => navigate("/login")}>
                  SignUp/Login
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">Orders</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Wishlist</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.clear(); // Clear all data from local storage
                    navigate("/"); // Navigate to the home page
                  }}
                >
                Logout
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/cartinvoice" className="d-flex align-items-center">
                <FaShoppingCart className="me-2" />
                Cart
                <Badge pill bg="danger" className="ms-2"> {cartCount} </Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="search-results-container">
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
            <div key={index} className="search-result-item"
            onClick={() => display_product(result) }>
                <p>{result.name}</p>
                <p>{result.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>
        {`
          .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 34px;
            padding: 10px;
            text-align: center;
            padding-bottom: 10px;
            padding-top: 100px;
          }

          .image-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }

          .image {
            width: 100px;
            height: 65px;
            object-fit: cover;
            border-radius: 8px;
          }

          .image-name {
            margin-top: 10px;
            font-size: 16px;
            color: #333; 
          }

          .search-results-container {
            padding-top: 80px; /* Adjust based on your navbar height */
          }

          .search-results {
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 20px;
            max-height: 400px; /* Set a maximum height */
            overflow-y: auto; /* Enable vertical scrolling */
          }

          .search-result-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
          }

          .search-result-item:last-child {
            border-bottom: none;
          }

          .search-result-item p {
            margin: 0;
            padding: 2px 0;
          }
        `}
      </style>
    </>
  );
}

export default NavBar;