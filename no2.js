class User{
    constructor(username,password,role){
        this.username=username,
        this.password=password,
        this.role=role
    }
}
var datauser=[
    new User('admin','123','admin'),
    new User('suhandy','123','user')
]

class Todo{
    constructor(kegiatan,hari,gambar){
        this.kegiatan=kegiatan,
        this.hari=hari,
        this.gambar=gambar
    }
}

var data=[
    new Todo('lari','senin','https://www.femina.co.id/images/images/PERSIAPAN%20LARI.jpg'),
    new Todo('shopping','selasa','https://www.parkgrandpaddingtoncourt.co.uk/blog/wp-content/uploads/2017/10/Shopping.jpg')
]
var salah=0
var userlogin=[]
const Register=()=>{
    if(userlogin.length!==0){
        alert('anda sudah login tidak bisa register mohon logout dahulu')
    }else{
        var username=document.getElementById('username').value
        var password=document.getElementById('password').value
        if(username&&password){
            var checkdata=datauser.filter((val)=>val.username==username)
            //console.log(checkdata)jika username sudah ada maka check panjang array nya sudah pasti lebih dari nol
            if(checkdata.length===0){
                datauser.push(new User(username,password,'user'))
                document.getElementById('isi').innerHTML='<h2>User berhasil register mohon login ulang</h2>'

            }else{
                document.getElementById('isi').innerHTML='<h2>Username sudah dipakai</h2>'
            }
        }else{
            document.getElementById('isi').innerHTML='<h2>Masukkan password atau username</h2>'
        }
    }
}


const Login=()=>{
    var username=document.getElementById('username').value
    var password=document.getElementById('password').value
    if(username&&password){
        var cekdata=datauser.filter((val)=>val.username==username&&val.password==password)
        if(cekdata.length===1){
            userlogin=cekdata[0]            
            if(cekdata[0].role==='admin'){
                document.getElementById('username').value=''
                document.getElementById('password').value=''
                document.getElementById('header').innerHTML =`
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Nama Kegiatan</th>
                                    <th>Hari</th>
                                    <th>Poster</th>
                                    <th>Act</th>
                                </tr>
                            </thead>`
                document.getElementsByTagName('tfoot')[0].innerHTML = `
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td><input type="text" id='kegiatan' placeholder="nama kegiatan"></td>
                                    <td>
                                        <select id="hari">
                                            <option hidden value="">pilih hari ..</option>
                                            <option value="senin">senin</option>
                                            <option value="selasa">selasa</option>
                                            <option value="rabu">rabu</option>
                                            <option value="kamis">kamis</option>
                                            <option value="jumat">jumat</option>
                                            <option value="sabtu">sabtu</option>
                                            <option value="minggu">minggu</option>
                                        </select>
                                    </td>
                                    <td><input type="text" id='gambar' placeholder="Gambar"></td>
                                    <td><button onclick="inputdataonClick()">Add todo</button></td>
                                </tr>
                            </tfoot>`
                PrintdataAdmin()
                PrintLogin()     
                document.getElementById('role').innerHTML= `Anda login sebagai ${cekdata[0].role}`
                document.getElementById("logout").innerHTML = `<button onclick="Logout()">Logout</button>`                
            }else{
                document.getElementById('username').value=''
                document.getElementById('password').value=''
                document.getElementById('header').innerHTML =`<thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Nama Kegiatan</th>
                                    <th>Hari</th>
                                    <th>Poster</th>
                                    
                                </tr>
                            </thead>
                            `
                PrintdataUser()
                PrintLogin()
                document.getElementById('role').innerHTML= `Selamat datang ${cekdata[0].username}
                Anda login sebagai ${cekdata[0].role}`
                document.getElementById("logout").innerHTML = `<button onclick="Logout()">Logout</button>`
            }
        }else{
            if(salah===0){
                document.getElementById('isi').innerHTML='<h2>User tidak ada bro</h2>'
            }else{
                document.getElementById('isi').innerHTML='<h2>Bego Lu</h2>'
            }
            salah++
        }
    }else{
        document.getElementById('isi').innerHTML='<h2>Masukkan password atau username</h2>'
    }
}    
const Logout=()=>{
    userlogin=[]
    document.getElementsByTagName('thead')[0].innerHTML=''
    document.getElementsByTagName('tbody')[0].innerHTML=''
    document.getElementsByTagName('tfoot')[0].innerHTML=''
    document.getElementById("logout").innerHTML = ''
    document.getElementById('role').innerHTML= ''
    document.getElementById('login').innerHTML=`Username :<input type="text" id="username" placeholder="masukkan nama"><br>
    Password :<input type="password" id="password" placeholder="masukkan password"><br><br>
    <button onclick="Register()">Register </button>
    <button onclick="Login()">Login </button></p>`
}


const PrintdataUser=()=>{
    var output=''
    data.forEach((val,index)=>{
            output+=`<tr>
                        <td>${index+1}</td>
                        <td>${val.kegiatan}</td>
                        <td>${val.hari}</td>
                        <td><img src=${val.gambar} alt=${index} height='200px'></td>
                        
                    </tr>`
    })
    document.getElementById('body').innerHTML=output
}

const PrintLogin=()=>{// supaya tidak bisa login ke user lain di dalam list Madding
    document.getElementById('login').innerHTML=``
}

var indexdelete=-1
var indexedit=-1

const PrintdataAdmin=()=>{
    var output=''
    data.forEach((val,index)=>{
        if(index==indexdelete){
            output+=`   <tr>
                            <td>${index+1}</td>
                            <td>${val.kegiatan}</td>
                            <td>${val.hari}</td>
                            <td><img src=${val.gambar} alt=${index} height='200px'></td>
                            <td>
                            <button onclick="canceldelete()">No</button>
                            <button onclick="acceptDelete(${index})">Yes</button>
                            </td>
                        </tr>`
        }else if(index==indexedit){
            output+=`   <tr>
                            <td>${index+1}</td>
                            <td><input type="text" id='editkegiatan' placeholder="nama kegiatan" value=${data[indexedit].kegiatan}></td>
                            <td>
                                <select id="edithari" >
                                    <option hidden value="">pilih hari ..</option>
                                    <option value="senin">senin</option>
                                    <option value="selasa">selasa</option>
                                    <option value="rabu">rabu</option>
                                    <option value="kamis">kamis</option>
                                    <option value="jumat">jumat</option>
                                    <option value="sabtu">sabtu</option>
                                    <option value="minggu">minggu</option>
                                </select>
                            
                            </td>
                            <td><input type="text" id='editgambar' placeholder="Gambar" value=${data[indexedit].gambar}></td>
                            <td>
                            <button onclick="cancelupdatedata()">Cancel</button>
                            <button onclick="updatedata(${index})">Save</button>
                        </tr>`
        }else{
            output+=`   <tr>
                            <td>${index+1}</td>
                            <td>${val.kegiatan}</td>
                            <td>${val.hari}</td>
                            <td><img src=${val.gambar} alt=${index} height='200px'></td>
                            <td>
                            <button onclick="deletekegiatan(${index})">delete</button>
                            <button onclick="editkegiatan(${index})">edit</button>
                            </td>
                        </tr>`
        }
    })
    document.getElementById('body').innerHTML=output
}

const editkegiatan=(indexed)=>{
    indexedit=indexed
    PrintdataAdmin()
}

const updatedata=(indexed)=>{
    var newkegiatan=document.getElementById('editkegiatan').value
    var newhari=document.getElementById('edithari').value
    var newimage=document.getElementById('editgambar').value
    if(newhari===''){
        newhari=data[indexed].hari
    }
    if(newimage===''){
        newimage=data[indexed].gambar
    }
    if(newkegiatan===''){
        newkegiatan=data[indexed].kegiatan
    }
    data.splice(indexed,1,new Todo(newkegiatan,newhari,newimage))
    indexedit=-1
    PrintdataAdmin()
}

const cancelupdatedata=()=>{
    indexedit=-1
    PrintdataAdmin()
}

const deletekegiatan=(indexdel)=>{
    indexdelete=indexdel
    PrintdataAdmin()
}
const acceptDelete=(indexdel)=>{
    data.splice(indexdel,1)
    indexdelete=-1
    PrintdataAdmin()

}
const canceldelete=()=>{
    indexdelete=-1
    PrintdataAdmin()
}

const inputdataonClick=()=>{
    var kegiatan=document.getElementById('kegiatan').value
    var hari=document.getElementById('hari').value
    var gambar=document.getElementById('gambar').value
    if(kegiatan==''||gambar==''||hari==''){
        alert('coba input semua dulu')
    }else{
        data.push(new Todo(kegiatan,hari,gambar))
        document.getElementById('kegiatan').value=''
        document.getElementById('hari').value=''
        document.getElementById('gambar').value=''
        PrintdataAdmin()
    }
}

