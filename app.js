/////////////////////////////////////////////////////////
/*
    ສ່ວນຂອງໜ້າສິນຄ້າ
*/

//ລາຍການສິນຄ້າເປັນ Array Object
// let shirt = [
//     {
//         id:1,
//         name : 'White shirt',
//         price : 10000,
//         img : 'image/white.jpg'
//     },
//     {
//         id:2,
//         name : 'Black shirt',
//         price : 15000,
//         img : 'image/black.jpg'
//     }
// ]

let shirt;

fetch('https://60cfa5e34a030f0017f67e29.mockapi.io/shirts')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        shirt = data
    })
    .then( () => setup())
    .catch(error => console.log(error));


function setup() {
    //ຟັງຊັ້ນເພື່ອໂຫຼດລາຍການສິນຄ້າຂຶ້ນສະແດງເທິງໜ້າເວັບ
    function loadproduct(){

        let output = `<div class="row">`;
        shirt.forEach( (s) => {
            output += `
                <div class="col l4 m6 s12">
                    <div class="card">
                        <div class="card-image" style="height:200px">
                            <img class="responsive-img" src="${s.img}" style="height:200px"/>
                            <span class="card-title">${s.name}</span>
                        </div>

                        <div class="card-content">
                            <h5 class="red-text text-accent-2">price: ${s.price} </h5>
                        </div>

                        <div class="card-action">
                            <a class="waves-effect waves-light btn-small" href="#" class="add-to-cart">Add to cart</a>
                        </div>
                    </div>
                </div>
            `;
        } );
        output += `</div>`;

        document.querySelector('#product').innerHTML = output;
        //console.log(shirt)
    }

    //ເອີ້ນໃຊ້ງານຟັງຊັ້ນ ເພື່ອໂຫຼດສິນຄ້າຂຶ້ນສະແດງເທິງໜ້າເວັບ
    loadproduct();

    //ໂຕປ່ຽນຈັດເກັບປຸ່ມ add-to-cart
    let cartBtn = document.querySelectorAll('.add-to-cart');
    cartBtn.forEach( (c,i) => {
        c.addEventListener( 'click', () => {
            console.log('clicked')
            addItem(); //ເພີ່ມເຂົ້າ localStorage
            updateCart();//ອັບເດດກະຕ່າ
            addCartItem(shirt[i]);
        } );
    } );


    //ຟັງຊັ້ນເພີ່ມຈຳນວນສິນຄ້າເຂົ້າໃນ localStorage
    function addItem() {
        let item = parseInt( localStorage.getItem('item') );
        
        if(item){
            localStorage.setItem( 'item', item + 1 );
        }else{
            localStorage.setItem( 'item', 1 );
        }
    }


    //ຟັງຊັ້ນອັບເດດກະຕ່າສິນຄ້າເທິງໜ້າເວັບ
    function updateCart(){
        let item = parseInt( localStorage.getItem('item') );

        if(item){
            document.getElementById('cart').innerHTML = item;
        } else {
            document.getElementById('cart').innerHTML = 0;
        }
    }

    //ເອີ້ນໃຊ້ຟັງຊັ້ນເພື່ອອັບເດດລາຍການສິນຄ້າ
    updateCart();

    //ຟັງຊັ້ນເພີ່ມລາຍການສິນຄ້າເຂົ້າກະຕ່າ
    function addCartItem(shirt){

        let cartItem = JSON.parse( localStorage.getItem('cart-item'));

        if( cartItem == null ){
            //ກໍລະນີທີ່ກະຕ່າຍັງບໍ່ທັນມີສິນຄ້າ
            shirt.qty = 1;
            cartItem = {
                [shirt.id] : shirt
            }
        } else {
            //ກໍລະນີທີ່ມີສິນຄ້າຢູ່ແລ້ວ ແຕ່ເປັນຄົນລະລາຍການ
            if( cartItem[shirt.id] == undefined ) {
                shirt.qty = 1;
                cartItem = {
                    ...cartItem,
                    [shirt.id] : shirt
                }
            } else {
                    //ກໍລະນີທີ່ມີສິນຄ້າຢູ່ແລ້ວ ໃຫ້ບວກອີກ 1
                cartItem[shirt.id].qty += 1;
            }
        }

        localStorage.setItem( 'cart-item', JSON.stringify(cartItem) );

        //ເອີ້ນໃຊ້ຟັງຊັ້ນ getTotalCost ພ້ອມກັບສົ່ງລາຄາສິນຄ້າ
        getTotalCost( shirt.price );
    }

    //ຟັງຊັ້ນຄຳນວນລາຄາລວມ
    function getTotalCost( price ){
        //ດຶງເອົາລາຄາລວມໃນ localStorage
        let totalCost =  localStorage.getItem( 'total-cost' );

        //ກວດວ່າມີຢູ່ ຫຼື ບໍ່
        if ( totalCost != null ){
            //ຖ້າວ່າມີຢູ່ ແມ່ນໃຫ້ບວກລາຄາໃໝ່ໃສ່
            totalCost = parseInt(totalCost);
            totalCost += price;
        }else {
            //ຖ້າຍັງບໍ່ທັນມີ ແມ່ນໃຫ້ເພີ່ມລາຄາໃສ່
            totalCost = price;
        }

        //ເພີ່ມຂໍ້ມູນເຂົ້າທີ່ localStorage
        localStorage.setItem( 'total-cost', totalCost );
    }
}