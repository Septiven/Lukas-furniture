import react from 'react'
import axios from 'axios'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class LandingPages extends react.Component{

    state = {
        dataFlashSale: null,
        data10cheap: null
    }

    componentDidMount(){
         this.getDataProducts()
         this.getTenCheap()
    }

    getTenCheap = () => {
        axios.get(`http://localhost:2000/products?_sort=price&_limit=10`)
        .then((res)=>{
            this.setState({data10cheap: res.data})
        })
        .catch((err)=>{console.log(err)})
    }

    getDataProducts = () => {
        axios.get('http://localhost:2000/products')
        .then((res) => {
            this.setState({dataFlashSale: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){

        const settingsDesktop = {
            autoplay: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true
        };

        const settingsMobile = {
            autoplay: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
        };

        return(
            <div>
                {/* jumbotron */}
                <div className='d-flex align-items-center jumbotron-landing-page'>
                    <div className="container text-center ">
                        <h1 className='funniture-font-size-70'>
                            Sale Up To 35%
                        </h1>
                        <input type='button' className='btn btn-warning' value='Shop Now!' />
                    </div>
                </div>
                {/* react slick section */}
                <div className='container text-center mt-5' style={{height: '300px', marginBottom: '100px'}}>
                    <div className="row justify-content-center">
                        <div className="col-11 col-md-12">
                            <h1>
                                Spesial Sales for your Furniture
                            </h1>
                            <p className='funniture-font-size-20'>
                                Comfortable, unique and practicable Furniture
                            </p>
                            {
                                
                                // this.state.data10cheap?
                                // <>
                                //     <Slider {...settingsDesktop} className='d-none d-md-block'>
                                //             {
                                //                 this.state.data10cheap.map((value, index) => {
                                //                     return(
                                                        
                                //                             <div className='px-3 py-3'>
                                //                                 <div style={{borderRadius: '30px'}}>
                                //                                     <Link to={`/detail-product/${value.id}`} >
                                //                                     <img src={value.image1} style={{width: '100%', height: '150px', borderRadius: '30px'}} />
                                //                                     </Link> 
                                //                                 </div>
                                //                                 <div className='text-left'>
                                //                                     <h5>
                                //                                         {value.name}
                                //                                     </h5>
                                //                                 </div>
                                //                                 <div className='text-left'>
                                //                                     <h5>
                                //                                         From Rp.<del>{(value.price).toLocaleString()}</del>
                                //                                     </h5>
                                //                                     <h5>
                                //                                         to Rp.{(value.price - (value.price * (value.diskon / 100))).toLocaleString()}
                                //                                     </h5>
                                //                                 </div>
                                //                             </div>
                                                        
                                //                     )
                                //                 })
                                //             }
                                //         </Slider>
                                // </>
                                // :
                                // null

                                this.state.dataFlashSale?
                                    <>
                                        <Slider {...settingsDesktop} className='d-none d-md-block'>
                                            {
                                                this.state.dataFlashSale.map((value, index) => {
                                                    return(
                                                        value.diskon?
                                                            <div className='px-3 py-3'>
                                                                <div style={{borderRadius: '30px'}}>
                                                                    <Link to={`/detail-product/${value.id}`} >
                                                                    <img src={value.image1} style={{width: '100%', height: '150px', borderRadius: '30px'}} />
                                                                    </Link> 
                                                                </div>
                                                                <div className='text-left'>
                                                                    <h5>
                                                                        {value.name}
                                                                    </h5>
                                                                </div>
                                                                <div className='text-left'>
                                                                    <h5>
                                                                        From Rp.<del>{(value.price).toLocaleString()}</del>
                                                                    </h5>
                                                                    <h5>
                                                                        to Rp.{(value.price - (value.price * (value.diskon / 100))).toLocaleString()}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        :
                                                            null
                                                    )
                                                })
                                            }
                                        </Slider>
                                        <Slider {...settingsMobile} className='d-block d-md-none'>
                                        {
                                            this.state.dataFlashSale.map((value, index) => {
                                                return(
                                                    value.diskon?
                                                        <div className='px-3 py-3'>
                                                                <Link to={`/detail-product/${value.id}`} >
                                                                <img src={value.image1} style={{width: '100%', height: '150px', borderRadius: '30px'}} />
                                                                </Link>                                                            
                                                            <div className='text-left'>
                                                                <h5>
                                                                    {value.name}
                                                                </h5>
                                                            </div>
                                                            <div className='text-left'>
                                                                <h5>
                                                                    Rp.{(value.price - (value.price * (value.diskon / 100))).toLocaleString()} <del>{value.price}</del>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                )
                                            })
                                        }
                                    </Slider>
                                    </>
                                :
                                    <div>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                

            </div>
        )
    }
}