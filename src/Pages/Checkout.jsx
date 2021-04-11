import React from "react"
import Axios from 'axios'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class Checkout extends React.Component{

    state = {
        dataTransaction: null
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        let idTransaction = this.props.location.pathname.split('/')[2]

        Axios.get(`http://localhost:2000/transactions/${idTransaction}`)
        .then((res) => {
            this.setState({dataTransaction: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    payment = () => {
        // Get Id Transaction
        let idTransaction = this.props.location.pathname.split('/')[2]

         // Get Date
         let date = new Date()
         date = date.toString()
 
         let newDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-' + date.split(' ')[3] + ' ' + date.split(' ')[4]

        Axios.patch(`http://localhost:2000/transactions/${idTransaction}`, {status: 'Paid', createdAt: newDate})
        .then((res) => {
            swal({
                title: "Payment Success!",
                icon: "success",
                button: "Ok",
            });

            setTimeout(function(){ window.location = '/user-profile/transaction-history' }, 3000);
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.state.dataTransaction === null){
            return(
                null
            )
        }

        return(
            <div className="container" style={{marginTop: '50px'}}>
                <h4>Checkout</h4>
                <div className="row mt-4">
                    <div className="row col-7">
                        <div className="col-12 border border-light">
                            <h3>Alamat Pengiriman</h3>
                            <hr/>
                            <p className="bg-warning">
                                Penerima :
                            </p>
                            <p>
                                SEPTIVEN LUKAS
                            </p>
                            <p>
                                Alamat :
                            </p>
                            <p>
                                Jl. BSD Green Office Park, GOP 9 - G Floor BSD City, Sampora, Kec. Cisauk, Tangerang, Banten 15p5
                            </p>
                            <p>
                                No Telepon :
                            </p>
                            <p>
                                0812 - 1231 - 8695
                            </p>
                        </div>
                    </div>
                    <div className="col-4 ml-5">
                        <div className="card shadow px-4 py-3">
                            <div className="my-2 py-3 border-bottom">
                                <h5>
                                    Your Items :
                                </h5>
                                {
                                    this.state.dataTransaction.detail.map((value, index) => {
                                        return(
                                            <div key={index} className="d-flex justify-content-between">
                                                <span className="card-text">{value.productName}({value.productQuantity}x)</span>
                                                <span className="card-text">Rp.{value.productPrice.toLocaleString()}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="mt-1 d-flex justify-content-between align-items-end">
                                    <div>
                                        <p className="mb-1">Total Bayar</p>
                                        <h6 className="my-0 font-weight-bold">Rp.{this.state.dataTransaction.total.toLocaleString()}</h6>
                                    </div>
                            </div>
                            <div className="mt-5 mb-2">
                                <h5 className="card-title my-2 py-2 border-bottom">Metode Pembayaran</h5>
                                <div className="row my-3 pt-1 pb-2 border-bottom">
                                    <img className="col-3" height="25px" width="60px" src="data:image/png;base64,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" alt=""/>
                                    <div className="col-9">
                                        <h6 className="card-subtitle">Alfamart / Alfamidi / Lawson</h6>
                                        <p className="card-text">Bisa di cabang mana saja</p>
                                    </div>
                                </div>
                                <div className="row my-3 pt-1 pb-2 border-bottom">
                                    <img className="col-3" height="20px" width="60px" src="http://fai.umsb.ac.id/upload/briva.png"  alt=""/>
                                    <div className="col-9">
                                        <h6 className="card-subtitle">BRI Virtual Account (BRIVA)</h6>
                                        <p className="card-text">Layanan cepat, tersedia 24 jam</p>
                                    </div>
                                </div>
                                <div className="row my-3 pt-1 pb-2 border-bottom">
                                    <img className="col-3" height="25px" width="80px" src="https://image.cermati.com/q_70,w_1200,h_800,c_fit/v1431504770/xnibjctvybqrvqycwd1v.png"  alt=""/>
                                    <div className="col-9">
                                        <h6 className="card-subtitle">Kredit / Debit (Mastercard)</h6>
                                        <p className="card-text">Bisa bayar penuh atau cicilan</p>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-success h-50" onClick={this.payment}>Bayar Sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}