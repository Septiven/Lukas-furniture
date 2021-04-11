import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class CatalogProducts extends React.Component{

    state = {
        dataBackupProducts: null,
        dataProducts: null,
        showModal: false,
        allCategory: null,
        allBrand: null
    }

    componentDidMount(){
        this.getDataProducts()
        this.getDataCatAndBrand()
    }

    getDataProducts = () => {
        axios.get('http://localhost:2000/products')
        .then((res) => {
            this.setState({dataProducts: res.data, dataBackupProducts: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getDataCatAndBrand = () => {
        axios.get('http://localhost:2000/products')
        .then((res) => {
            // Ambil category 
            let arrCategory = []

            res.data.forEach((value) => {
                if(arrCategory.includes(value.category)){

                }else{
                    arrCategory.push(value.category)
                }
            })

            // Ambil brand
            let arrBrand = []

            res.data.forEach((value) => {
                if(arrBrand.includes(value.brand)){

                }else{
                    arrBrand.push(value.brand)
                }
            })

            console.log(arrCategory)
            console.log(arrBrand)

            this.setState({allCategory: arrCategory, allBrand: arrBrand})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    filterData = () => {
        let category = this.refs.selectCategory.value
        let brand = this.refs.selectBrand.value

        let filteredProducts = this.state.dataBackupProducts.filter((value) => {
            if(category === 'All' && brand === 'All'){
                return this.state.dataBackupProducts
            }else if(category === 'All' && brand !== 'All'){
                return value.brand === brand
            }else if(category !== 'All' && brand === 'All'){
                return value.category === category
            }else if(category !== 'All' && brand !== 'All'){
                return value.category === category && value.brand === brand
            }
        })

        this.setState({dataProducts: filteredProducts})
        this.setState({showModal: false})
    }

    sortData = () => {
        let sort = this.refs.selectSort.value
        let sortProducts

        if(sort === 'Low To Hight'){
            sortProducts = this.state.dataBackupProducts.sort((a, b) => {
                return a.price - b.price
            })
        }else if(sort === 'Hight To Low'){
            sortProducts = this.state.dataBackupProducts.sort((a, b) => {
                return b.price - a.price
            })
        }else{
            sortProducts = this.state.dataBackupProducts.sort((a, b) => {
                return a.price - b.price
            })
        }

        this.setState({dataProducts: sortProducts})
        this.setState({showModalSort: false})
    }

    render(){
        return(
            <div>
                {/* BANNER SECTION */}
                <div style={{height: '200px',backgroundImage:'URL("https://www.3ctele.com/wp-content/uploads/2015/12/3c-gradient-background.png")',backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>

                </div>

                {/* FILTER SECTION */}
                <div className='container'>
                    <div className="row my-5">
                        <div className="col-12">
                            <button type="button" class="btn btn-primary mx-3" onClick={() => this.setState({showModal: true})}>Filter</button>
                            <button type="button" class="btn btn-primary mx3" onClick={() => this.setState({showModalSort: true})}>Sort</button>
                        </div>
                    </div>
                </div>

                {/* CATALOG SECITON */}
                <div className="container" style={{height: '100%'}}>
                    <div className="row">
                        {
                            this.state.dataProducts?
                                this.state.dataProducts.map((value, index) => {
                                    return(
                                        <>
                                            <div className="col-4 px-3 py-3" key={index}>
                                            <Link to={`/detail-product/${value.id}`}>
                                                    <img src={value.image1} className="border border-dark" style={{borderRadius:"20px"}} width='100%' height='150px' />
                                            </Link> 
                                                <div style={{textAlign:"center"}}>
                                                    <h5>
                                                        {value.name}
                                                    </h5>
                                                </div>
                                                <div>
                                                    <h5>
                                                        Rp.{value.diskon?
                                                                (value.price - (value.price * (value.diskon / 100))).toLocaleString()
                                                            :
                                                                value.price.toLocaleString()}
                                                    </h5>
                                                    <p>
                                                        Weight: {value.weight}Kg <br/>
                                                        Discount: {value.diskon}%
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            :
                                null
                        }
                    </div>
                </div>

                {/* MODAL filter SECTION */}
                <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalBody className='px-5 py-5' style={{backgroundImage:"URL('https://htmlcolors.com/gradients-images/35-pushcrew-color-gradient.jpg')"}}>
                        <div className='text-center'>
                            <h3>
                                Filter Data
                            </h3>
                        </div>
                        <div className='mt-3'>
                            <label for="exampleFormControlSelect1">Category</label>
                            <select ref='selectCategory' class="form-control" id="exampleFormControlSelect1">
                                <option value='All'>All</option>
                                {
                                    this.state.allCategory?
                                        this.state.allCategory.map((value, index) => {
                                            return(
                                                <option value={value} key={index}>{value}</option>
                                            )
                                        })
                                    :
                                        null
                                }
                            </select>
                        </div>
                        <div className='my-4'>
                            <label for="exampleFormControlSelect1">Brand</label>
                            <select ref='selectBrand' class="form-control" id="exampleFormControlSelect1">
                                <option value='All'>All</option>
                                {
                                    this.state.allBrand?
                                        this.state.allBrand.map((value, index) => {
                                            return(
                                                <option value={value} key={index}>{value}</option>
                                            )
                                        })
                                    :
                                        null
                                }
                                </select>
                        </div>
                        <div>
                            <input type='button' value='Filter' className='btn btn-secondary text-dark w-100' onClick={this.filterData} />
                        </div>
                    </ModalBody>
                </Modal>

                {/* MODAL SORT SECTION */}
                <Modal toggle={() => this.setState({showModalSort: false})} isOpen={this.state.showModalSort}>
                    <ModalBody className='px-5 py-5' style={{backgroundImage:"URL('https://htmlcolors.com/gradients-images/35-pushcrew-color-gradient.jpg')"}}>
                        <div className='text-center'>
                            <h3>
                                Sort Data
                            </h3>
                        </div>
                        <div className='my-4'>
                            <label for="exampleFormControlSelect1">Sort By</label>
                            <select ref='selectSort' class="form-control" id="exampleFormControlSelect1">
                                <option value='Low To Hight'>Low Price To Hight</option>
                                <option value='Hight To Low'>Hight Price To Low</option>
                                <option value='Default'>Default</option>
                            </select>
                        </div>
                        <div>
                            <input type='button' value='Sort' className='btn btn-secondary text-dark w-100' onClick={this.sortData} />
                        </div>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}