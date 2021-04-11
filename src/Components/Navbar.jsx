import react from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser, faEye} from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LinkAPI from './../Support/Constants/LinkAPI'
import { connect } from 'react-redux';

class Navbar extends react.Component{

    state = {
        username: null,
        showModal: false,
        TotalCarts: 0,
        currentTotalCarts: 0,
        showPassword: false
    }

    componentDidMount(){
        this.getUsername()
        // this.getTotalCarts()
        this.getCurrentTotalCarts()
    }

    getUsername = () => {
        // Ambil ID dari local storage
        let id = localStorage.getItem('id')

        if(id){
            Axios.get(LinkAPI + `/${id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({username: res.data.username})

                // KALO USERNAME MAU DIBATAS SEBANYAK 3 KARAKTER SAJA
                // let panggilan = ''
                // for(let i=0;i<3;i++){
                //     panggilan += res.data.username[i]
                //     this.setState({username: panggilan})
                // }

            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    onLogin = () => {
        let inputLogin = this.refs.inputLogin.value
        let inputPasswordLogin = this.refs.inputPasswordLogin.value
        let inputLoginType = ''

        if(inputLogin[0] >= 0){
            inputLoginType = 'phone'
        }else{
            inputLoginType = 'email'
        }

        Axios.get(LinkAPI + `?${inputLoginType}=${inputLogin}&password=${inputPasswordLogin}`)
        .then((res) => {
            if(res.data.length === 1){
                alert('Login Berhasil')
                localStorage.setItem('id', res.data[0].id)
                this.setState({showModal: false})
                window.location = '/'
            }else if(res.data.length !== 1){
                alert('User & Password Tidak Ditemukan')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onLogout = () => {
        let confirm = window.confirm('Anda Yakin Mau Logout?')

        if(confirm){
            localStorage.removeItem('id')
            window.location = '/'
        }
    }

    // getTotalCarts = () => {
    //     let id = localStorage.getItem('id')

    //     Axios.get(`http://localhost:2000/carts?idUSer=${id}`)
    //     .then((res) => {
    //         this.setState({totalCarts: res.data.length})
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    getCurrentTotalCarts = () => {
        let id = localStorage.getItem('id')

        Axios.get(`http://localhost:2000/carts?idUSer=${id}`)
        .then((res) => {
            this.setState({currentTotalCarts: res.data.length})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div style={{backgroundColor: "#150e56",color:"white"}}>
            <div className="container">
                <div className="row container.fluid" style={{height: "70px"}}>
                    <div className="col-6 d-flex align-items-center">
                        <span className="col-3 mx-3" style={{fontFamily: "fantasy",fontSize:"25px"}}>
                            <Link to='/' className='funniture-link'>
                                LUKAS-Furniture
                            </Link>
                        </span>
                        <div className='col-9 d-none d-md-flex'>
                            <span className="mx-2">Ruang Tamu</span>
                            <span className="mx-2">kamar Tidur</span>
                            <span className="mx-2">Dekorasi</span>
                        </div>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <span>
                        <div class="d-md-block d-none">
                           <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Cari produk" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                           </form>
                        </div>
                        </span>
                        <span className="mx-2" style={{width:"100px",textAlign:"center"}}>
                            {this.state.username?
                                `Hello, ${this.state.username}`
                                :
                                null}
                        </span>
                        <span>
                            {this.state.username?
                                <input type="button" value="Logout" className="btn btn-danger" onClick={this.onLogout}/>
                                :
                                null
                            }
                        </span>
                                
                        <span className="d-none d-md-block position-relative">
                        {this.state.username?
                            <Link to='/user-profile' className='funniture-link'>    
                            <span className='d-none d-md-block'>
                                <FontAwesomeIcon icon={faUser} className='funniture-font-size-22' />
                            </span>
                            </Link>
                            :
                            <span className='d-none d-md-block' onClick={() => this.setState({showModal: true})}>
                                <FontAwesomeIcon icon={faUser} className='funniture-font-size-22' />
                            </span>
                        }
                        </span>
                        <span className="mx-3 d-none d-md-block position-relative">
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    <Link to='/cart'>
                        <span className="d-none d-md-block position-relative">                                                   
                                 <FontAwesomeIcon icon={faShoppingCart} />
                                 <div className='text-center funniture-bg-light' style={{position: 'absolute', top: '-10px', left: '20px', width: '25px', borderRadius: '100%'}}>
                                 {/* KALO PAKE WINDOW LOCATION */}
                                 {/* {
                                    this.state.totalCarts?
                                        this.state.totalCarts
                                        :
                                        0
                                } */}
                                {
                                    this.props.carts.data?
                                    this.props.carts.data.length
                                    :
                                    this.state.currentTotalCarts
                                }
                                 </div>
                        </span>
                    </Link>
                    </div>
                </div>
            </div>
                        {/* buat mobile */}
                        <div class="container-fluid d-md-none d-block">
                           <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Cari produk" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                           </form>
                        </div>


                {/* MODAL SECTION */}
                <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalBody className='px-5 py-5'>
                        <div className='text-center'>
                            <h3>
                                Login Account
                            </h3>
                        </div>
                        <div className='mt-5'>
                            <input type='text' ref='inputLogin' placeholder='Phone Number / Email' className='form form-control' />
                        </div>
                        <div className='my-4'>
                            <span>
                            <input type={this.state.showPassword === false? 'password' : 'text'} ref='inputPasswordLogin' placeholder='Password' className='form form-control'/>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faEye} onClick={() => this.setState({showPassword: !this.state.showPassword})} />
                            </span>
                        </div>
                        <div>
                            <input type='button' value='Login' className='btn btn-primary w-100' onClick={this.onLogin} />
                        </div>
                        <div className='mt-5 text-center'>
                            <p>
                                Don't have account? <Link to='/register'><span className='font-weight-bold'>Register here.</span></Link>
                            </p>
                        </div>
                    </ModalBody>
                </Modal>
                        
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        carts: state.carts
    }
}

export default connect(mapStateToProps, '')(Navbar)