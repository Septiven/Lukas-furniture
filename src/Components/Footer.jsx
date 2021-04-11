import react from 'react'

export default class Footer extends react.Component{
    render(){
        return(
            <div className="container.fluid">
                <div className="bg-light">
                    <h5 className="mx-5">Toko Furniture online, solusi untuk kebutuhan furniture minimalis dan modern</h5>
                    <p className="mx-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div>
                    <div className="d-md-flex d-none justify-content-center" style={{backgroundColor: "#31326f",color:"white"}}>
                        <div className="mx-5 mt-5">
                            <h5>Lukas</h5>
                                <div className="mt-5">Tentang kami</div>
                                <div>Lukas Project</div>
                                <div>Promo Lukas Project</div>
                                <div>Blog</div>
                                <div>Filosofi Lukas</div>
                                <div>karir</div>
                        </div>
                        <div className="mx-5 mt-5">
                            <h5>Layanan Pelanggan</h5>
                                <div className="mt-5">FAQ</div>
                                <div>Kebijakan Privasi</div>
                                <div>Syarat dan Ketentuan</div>
                                <div>Kebijakan Pengiriman</div>
                                <div>Kebijakan Pengembalian</div>
                                <div>Lokasi Kota Pengirim</div>
                        </div>
                        <div className="mx-5 mt-5">
                            <h5>Kontak Kami</h5>
                                <div className="mt-5">+6287883472947</div>
                                <div>0214797427842</div>
                                <div>Hello@Lukas.com</div>
                                <div>Senin - Minggu / 10.00 - 20.00</div>
                                <div>(Termasuk Hari Libur)</div>
                        </div>
                    <div className="mx-5 mt-5">
                        <h5>Daftar dan Dapatkan Voucher Diskon Rp50.000 </h5>
                        <div class="container-fluid">
                           <form class="d-flex mt-5">
                            <input class="form-control me-2" type="search" placeholder="Alamat E-mail" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="Daftar">Daftar</button>
                           </form>
                           <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        )
    }
}