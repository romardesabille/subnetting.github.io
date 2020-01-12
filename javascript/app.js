const binn = document.getElementById('bin');
const sn = document.getElementById('sn');
const prefixx = document.getElementById('prefixx');
const text = document.getElementById('text');
const table1 = document.getElementsByTagName('tbody')[0];

function calculate(){
    const given_ = document.getElementById('given').value;
    const prefix_ = document.getElementById('prefix').value;
    const host_ = document.getElementById('host').value;

    let row = 0;
    /*
    let given = '192.168.60.160';
    let prefix = 21;
    let host = 64 + 2;
    */
   let given = parseInt(given_);
   let prefix = parseInt(prefix_);
   let host = parseInt(host_) + 2;
   
    let bin = 32 - prefix;
    let ip_arr = given_.split('.');
    
    let increment;
    let twoN_sup = 0;
    let m = 0;
    let num;
    let onBits = prefix-16;
    for (let i = 0; i < bin; i++) {
        let h = Math.pow(2, i);
        if (h == 256) {
            twoN_sup = 0;
        }
        num = 256 - h;
        
        let twoN = Math.pow(2, twoN_sup);
        twoN_sup++;

        if (h == host) {
            increment = Math.pow(2, twoN_sup);
            break;
        }
        if (h > host) {
            increment = twoN;
            break;
        }
        m++; 
    }
    

    let n = bin - m;

    for (let i = 0; i < bin; i++) {
        binn.innerHTML += '0' + ' ';
        sn.innerHTML += 2 + '<sup>' + (bin - i - 1) + '</sup>';

        if (n - 1 == i) {
            binn.innerHTML += '| ';
            sn.innerHTML += '| ';
        }
    }

    text.innerHTML = ip_arr[0] + '.' + ip_arr[1] + '.';
    for(let i = 0; i < 16; i++){
        if(i == 8){
            text.innerHTML += '.';
        }
        if(onBits > i){
            text.innerHTML += '1';
        }else if(prefix-16 >= i){
            text.innerHTML += '|';
        }else{
            text.innerHTML += '0';
        }
        if(prefix+i < 30){
            prefixx.innerHTML += '<sup>/</sup>' + parseInt(prefix+i+1);
        }
    }

    let defaultMask = 0;
    let host_arr = [128, 64, 32, 16, 8, 4 , 2, 1];
    for(let i = 0; i < onBits; i++){
        if(host_arr[i] <= increment){
            defaultMask += host_arr[i];
        }
    }
    text.innerHTML += '<br><br>Default Subnet Mask:<br>255.255.' + defaultMask + '.0';
    text.innerHTML += '<br>Custom Subnet Mask:<br>255.255.255.' + num;
    
    

    let c = parseInt(ip_arr[3]);
    let b = parseInt(ip_arr[2]);

    row = 0;
    let cbAddr = 0;
    console.log(num);

    console.log(c+increment);
    for (let i = ip_arr[2]; i <= 255; ) {
        let newRow = table1.insertRow(row);

        let cell1 = newRow.insertCell(0);
        let cell3 = newRow.insertCell(1);
        let cell21 = newRow.insertCell(1);
        let cell22 = newRow.insertCell(2);

        cell1.innerHTML = ip_arr[0] + '.' + ip_arr[1] + '.' + b + '.' + c;
        cell21.innerHTML =
            ip_arr[0] + '.' + ip_arr[1] + '.' + b + '.' + parseInt(c + 1);

        c += increment;
        cbAddr += increment - 1;
     
        if (c > num) {
            
            c = parseInt(ip_arr[3]);
            cbAddr = 255;
            b += 1;
            i++;
        }
        cell3.innerHTML = ip_arr[0] + '.' + ip_arr[1] + '.' + b + '.' + cbAddr;
        cell22.innerHTML =
            ip_arr[0] + '.' + ip_arr[1] + '.' + b + '.' + parseInt(cbAddr - 1);
        if (cbAddr > num) {
            cbAddr = 0;
        }
        row++;
    }
};


/*
    192.168.60.160
    21
    30

*/ 


