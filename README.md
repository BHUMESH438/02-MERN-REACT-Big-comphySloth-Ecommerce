## Notes

#### 0 Remove git in windows

rmdir .git

- \_redirects(deploy router to netlify 404 error, to rectify it )

### 1 use styled compoenents to avoid css loading

```js
import styled from 'styled-components';
const Button = styled.button` req style`;
```

### 2 use index for bunch of import/export.?

- use index for bunch of import/export.? a bunch of named export in a single file of a bunch of file in a folder
- 1 way = import and use named export in a single file
- 2 way = directly use named export
- [read this link for differnce of export ](https://chat.openai.com/share/ba19a590-02da-4b0e-a1cc-22473a040974)
  -see the index file in the pages and componenet see the differnt ways of exporting

### react router v5

```js
<BrowserRouter>
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route exact path='/products'>
      <Products />
    </Route>
    <Route exact path='/products/:id' children={<SingleProduct />} />
  </Switch>
</BrowserRouter>
```

### react router v6

```js
<BrowserRouter>
<Routes>//instead of swith Routes
  <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product' element={<Products />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route
          path='/product'
          element={
            // child
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        {/* global error */}
        <Route path='*' element={<Error />} />
</BrowserRouter>
```

### setup navbar and side bar

- (product_context,products_reducer,Sidebar,Navbar,CartButton,main index)
- setup navbar and sidebar
- create a reducer function and pass the boolean value for close and open of side bar to sidebar componenet through the context provider
- create actions and reducers in a seperate file
- make navbar responsive for big screen and small screen through the styled componenet
- pass the open boolean value to the nav bar through the useglobalcontext provider

### error page

- navigate to home page through link
- use section , sidebar - aside, navbar - div

### about page,checkout,PageHero

- use article in the about
- the about,chekout page have two component
- divide the about page above 992px with into 2 by grid

### lorem

```js
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
```

### home page => hero, servicves, contact, fetured product

- hero
- setup the image, follow grid,images relative position
- responsiveness above 992 the image should dispalay @media(min-width:992px)

- in services responiveness is fixed for three types

- fetch the product data from api through axios and invoke once by useeffect

```js
const fetchProducts = async url => {
  const response = await axios.get(url);
};

//fetch once in the productpage
useEffect(() => {
  fetchProducts(url); //pass the url
}, []);
```

### product context and reducers

- setup the context provider and global context and also axios and provide the props and values
- const[state,type of opration]=usereducer(function,initialstate value)

### featured product components

- we can give aliases while destructureing

```js
const { products_loading: loading, products_error: error, featured_products: featured } = useProductsContext();

<div className='section-center featured'>
  {featured.slice(0, 3).map(product => {
    return <Product key={product.id} {...product} />;
  })}
</div>;
```

slice - start with the position and ends with before the given position in the array

- in product component

```js
{
  /* placing icon inside the image */
}
<Link to={`/products/${id}`} className='link'>
  <FaSearch />
</Link>;
```

- pass the id as id not :id as in the app only to get the value we use id

### single product page

- we fetch the single product from product context and use reducer function and pass the function and arg

- for single product there will be a useeffect and we will pass that useeffect in that single product with id as dependency

### programatically redirect the error with usenaviagte in v6.0+ and useHistory history.push in version 5+

```js
useEffect(() => {
  if (error) {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }
}, [error]);
```

### in single product destructure the single product details and use it for the single product component page

- pass the singleproduct boolean value to the pageHero
- so if the page naviagtion componenet in the product page it show product/singleproduct or home/about..product...

```js
<Wrapper>
  <PageHero title={name} singleproduct />
</Wrapper>
```

### we use extras 3 componenet in singlecomponent page

- ProductImages
- stars
- AddToCart

- ### ProductImage component
- if the image is undefined we can give the default value in the props

```js
  const ProductImages = ({ images = [] }) => {
    const [main, setMain] = useState(images[0]);
...
   onClick={() => setMain(images[index])}
              className={`${image.url === main.url && 'active'}`}
            />
```

- ### star component

- creating star using array iteration looops

```js
const tempStars = Array.from({ length: 5 }, (_, index) => {
  // const number = index + 0.5;
  return <span key={index}>{stars >= index + 1 ? <BsStarFill /> : stars >= index + 0.5 ? <BsStarHalf /> : <BsStar />}</span>;
});
```

### add to cart

- create buttons for color

```js
 {colors.map((color, index) => {
            return (
              <button key={index} style={{ background: `${color}` }} className={`color-btn ${mainColor === color && 'active'}`} onClick={() => setMainColor(color)}>
                {(mainColor === color && <FaCheck />) || null}
              </button>
            );
```

- create buttons for quantity and pass the default value in the state

```js
<AmountButtons amount={amount} increase={increase} decrease={decrease} />
```

### amount buttons - in amount buttons the setAmount will update the amount in the state value

```js addtocart
const [amount, setAmount] = useState(1);
const [mainColor, setMainColor] = useState(colors[0]);
// the set amount will update the current value of the amount in the state and returns the updated value
const increase = () => {
  setAmount(Oldamount => {
    let tempAmount = Oldamount + 1;
    if (tempAmount > stock) {
      tempAmount = stock;
    }
    return tempAmount;
  });
};
```

### filtercontext setup a = [...b]

- setup the filter context inside the productcontext and get the fetched product[] from the productprovider by the product global context

- in the filter reducer copy the product array and not refernce it. it is done by

### go to the product page and provide the filter and sort component

### product page

- filter, sort, productlist componenet
- inside productlist - setup the gridview,listview

### get the filtered_product list from the filtercontext in the productList componenet

### productList page

- setup the gridview,listview

### sort page

- in sort page add the sort icon for grid_view true/false as it gives the list/gridview from the product list componenets
- also the icon changes according to the boolean value of gridview in the filtercontext
- setup the sort-filter inside the form

### set the click buttons in sortpage componenet

- in sort componenet we invoke the onclicklfn for the sort btn of list and grid view
- if we wnat to hold a value we need to pass the function inside the function in onclick which will invoke only after click render and
- setup the toggle for grid and list view

### sort controlled input- sort,localecompare

- get the value from the select option to sort in the context
- for sorting numbers use array.sort((a-b)=>a-b)
- for soerting the letters in array use array.sort((a-b)=>a.localecompare(b,'en',{sensitivity:base}))

# filters

### 1. default values

-Math.max(), map

- while updating the object destrucutre it by ... as the previous value will be erased and also update it by re-assigning the values

```js
 filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice
      }
```

### 2. filter-text-search-dynamic input

- get the filter state value,updatefilter,clearfilter function - usefitlercontext()

- inorder to set a contrilled input we need a value and onChange
- set the value dynamically in the reducer action by [name]:value
- see the jsnuggets dynamic property value
  -getUnique value -utils

```js
export const getUniqueValues = (data, type) => {
  let uniqueItem = data.map(item => {
    return item[type];
  });
  if (type === 'colors') {
    uniqueItem = uniqueItem.flat();
  }
  return ['all', ...new Set(uniqueItem)];
};
```

why should we shoiuld give new near the set
flat will help to remove nested array and how it deep it is

```js
1;
const newArray = originalArray.flat([depth]);
2;
const nestedArray = [1, 2, [3, 4, [5, 6]]];
const flatArray = nestedArray.flat(2); // Flatten two levels deep

console.log(flatArray); // Output: [1, 2, 3, 4, 5, 6]
3;
const nestedArray = [1, 2, [3, 4, [5, 6]]];
const flatArray = nestedArray.flat(); // Defaults to depth 1

console.log(flatArray); // Output: [1, 2, 3, 4, [5, 6]]
```

### catogery filter

-map the catogery filter
