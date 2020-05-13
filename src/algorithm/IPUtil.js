import IP from '../model/IP'
import BigInt from '../../node_modules/big-integer/BigInteger'
class IPUtil{
    static IPV4Bits = 32;

    static getOctetBigInt(n){
        return BigInt(n)
    }
    
    static getIPObject(ip = '0.0.0.0/0'){
        let netId = ip;
        let cidr = 0;
        let networkId = BigInt.zero;

        // parsing subnet
        for (let i = netId.length - 1; i >= 0; i--){
            if (netId[i] === '/'){
                cidr = netId.substring(i+1, netId.length);
                netId = netId.substring(0, i);
                cidr = parseInt(cidr);
                break;
            }
        }

        // parsing network ID
        for (let i = 0, last = 0, shift = BigInt(24); i < netId.length; i++){
            if (netId[i] === '.'){
                const octet = this.getOctetBigInt(netId.substring(last, i));
                networkId += (octet << shift);

                last = i + 1;
                shift -= BigInt(8);
            }
            else if (i + 1 === netId.length){
                const octet = this.getOctetBigInt(netId.substring(last, i+1));
                networkId += (octet << shift);
            }
        }

        return new IP(networkId, ip, cidr); // IP Object{addressValue, addressNotation, cidr}
    }

    static getAvailableSpace(ip){
        const IPObject = this.getIPObject(ip);
        const addressValue = BigInt(IPObject.addressValue);
        const cidr = IPObject.cidr;

        const wildcard = this.IPV4Bits - cidr;
        // console.log("Wildcard", wildcard);
        
        let host = BigInt.zero;
        for (let i = 0; i < wildcard; i++){
            const bit = BigInt.one.shiftLeft(i);
            // console.log("bit ", addressValue.shiftRight(i).and(BigInt.one));
            
            if (addressValue.and(bit).greater(BigInt.zero)){
                host = host.or(bit);
            }
            // if (this.isSet(addressValue, i)){
            //     host = host.or(bit);
            // }
            // console.log(host);
        }
        // const x = BigInt.one.shiftLeft(wildcard+1);
        // console.log(x);
        return BigInt.one.shiftLeft(wildcard+1) - host;
    }

    static getIPNotation(n, cidr=-1){
        let mask = BigInt(255).shiftLeft(24);
        // console.log("mask: " , mask);
        let ip = "";
        for (let i = 3; i >= 0; i--, mask = mask.shiftRight(8)){
            // console.log("mask " + mask);
            let octet = BigInt(n & mask).shiftRight(i * 8);
            if (i < 3) ip += ".";
            ip += octet;
        }
        // console.log("ip", ip);
        if (cidr === -1)
            return ip;
        return ip + "/" + cidr;
    }
}

export default IPUtil;