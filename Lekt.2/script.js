let obj = {
    //first_name, last_name ...

    first_name: "Shid",
    last_name: "Barn",

    sayHello() {
        console.log(this.first_name);
    }
}

console.log(obj.first_name, obj.last_name);
console.log(obj.first_name), obj.sayHello();