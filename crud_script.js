
class Node {
    constructor(element)
    {
        this.element = element;
        this.next = null
    }
}

class LinkedList {
    constructor()
    {
        this.head = null;
        this.size = 0;
    }
    add(element)
    {
        var node = new Node(element);
        var current;    
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;  
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }
    indexOf(element)
    {
        var found = false;
        var current = this.head;     
        // iterae over the list
        while (current != null && !found) {
            // compare each element of the list
            // with given element
            if (current.element.Name== element.Name){
                if(current.element.Name== element.Name && current.element.Surname== element.Surname && current.element.Gender== element.Gender && current.element.Hobby== element.Hobby && current.element.Phone == element.Phone){
                    found=true;
                }
            }
            else{
                found=false
            }
            current = current.next;
        }
        return found;
    }
    removeElement(element)
    {
        var current = this.head;
        var prev = null;    
        // iterate over the list
        while (current != null) {
            // comparing element with current
            // element if found then remove the
            // and return true
            if (current.element.Name== element.Name) {
                if(current.element.Name== element.Name && current.element.Surname== element.Surname && current.element.Gender== element.Gender && current.element.Hobby== element.Hobby && current.element.Phone == element.Phone){
                    if (prev == null)   this.head = current.next;
                    else    prev.next = current.next;
                    this.size--;
                }                
            }
            prev = current;
            current = current.next;
        }
    }
}
var ll = new LinkedList();





var selectedRow=null;
edit=false;
isValid_name=true;
isValid_data=true;
function onFormSubmit(){
    var formData= readFormData();
    validate(formData);
    if(isValid_name && isValid_data){
      
        if(selectedRow==null)
            insertNewRecord(formData);
        else
            updateRecord(formData );
        clear();
    }
}
function readFormData(){
    var formData={};
    formData["Name"]=document.getElementById("Name").value;
    if(document.getElementById("Surname").value!="")
        formData["Surname"]=document.getElementById("Surname").value;
    else
        formData["Surname"]="-";

    var male_value=document.getElementById("Male").checked;
    var fem_value=document.getElementById("Female").checked;
    if(male_value==true || fem_value==true)
        formData["Gender"]=document.querySelector('[name="Gender"]:checked').value;
    else
        formData["Gender"]="-";
        
    if(document.getElementById("Hobby").value != "")
        formData["Hobby"]=document.getElementById("Hobby").value;
    else 
        formData["Hobby"]="-"

    if(document.getElementById("Phone").value!="")
        formData["Phone"]=document.getElementById("Phone").value;
    else
        formData["Phone"]="-";

    return formData;
}
function insertNewRecord(data){
    var table=document.getElementById("employeeList").getElementsByTagName("tbody")[0];
    var newRow=table.insertRow(table.length);
    cell1=newRow.insertCell(0);
    cell1.innerHTML=data.Name;
    cell2=newRow.insertCell(1);
    cell2.innerHTML=data.Surname;
    cell3=newRow.insertCell(2);
    cell3.innerHTML=data.Gender;
    cell4=newRow.insertCell(3);
    cell4.innerHTML=data.Hobby; 
    cell5=newRow.insertCell(4);
    cell5.innerHTML=data.Phone;
    cell6=newRow.insertCell(5);

    cell6.innerHTML=`<a onClick="onEdit(this)" Id="edit">Edit</a> 
                        <b onClick="onDelete(this)" Id="delete">Delete</b>`;
    
}
function clear(){
    document.getElementById("Name").value="";
    document.getElementById("Surname").value="";
    document.getElementById("Male").checked=false;
    document.getElementById("Female").checked=false;
    document.getElementById("Phone").value="";
    document.getElementById("Hobby").value="";
}
function onEdit(td){
    edit=true;
    //selecting the row to edit
    selectedRow=td.parentElement.parentElement;
    document.getElementById("Name").value=selectedRow.cells[0].innerHTML;
    document.getElementById("Surname").value=selectedRow.cells[1].innerHTML;
    var gender=selectedRow.cells[2].innerHTML;
    if (gender=="Male") document.getElementById("Male").checked=true;
    else if(gender=="Female") document.getElementById("Female").checked=true;
    else document.getElementsByName("Gender").checked=false;
    document.getElementById("Hobby").value=selectedRow.cells[3].innerHTML;
    if(selectedRow.cells[4].innerHTML !="-") document.getElementById("Phone").value=selectedRow.cells[4].innerHTML;
    else document.getElementById("Phone").value=""
    document.getElementById("delete").style.cursor="not-allowed";
}
function updateRecord(formData ){
    selectedRow.cells[0].innerHTML = formData.Name;
    selectedRow.cells[1].innerHTML = formData.Surname;
    selectedRow.cells[2].innerHTML = formData.Gender;
    selectedRow.cells[3].innerHTML = formData.Hobby;
    selectedRow.cells[4].innerHTML = formData.Phone;
    selectedRow=null;
    edit=false;
    document.getElementById("delete").style.cursor="pointer";
}
function onDelete(td){
    if(edit==false){
        if(confirm('Are you sure to delete this record?')){
            row=td.parentElement.parentElement;
            document.getElementById("employeeList").deleteRow(row.rowIndex);
            
            //creating an object to pass to removeElement method
            delete_element={}
            delete_element["Name"]=row.cells[0].innerHTML;
            delete_element["Surname"]=row.cells[1].innerHTML;
            delete_element["Gender"]=row.cells[2].innerHTML;
            delete_element["Hobby"]=row.cells[3].innerHTML;
            delete_element["Phone"]=row.cells[4].innerHTML;
            ll.removeElement(delete_element);
            clear();
        }
    }
    else{
        document.getElementById("delete").style.cursor="not-allowed";
    }
}

//object validation
function validate(formData){
    //Name validation
    if(document.getElementById("Name").value=="") {
        isValid_name=false;
        document.getElementById("empty").innerHTML="This field is required*";
    }
    else{
        isValid_name= true;
        document.getElementById("empty").innerHTML="";
    }

    //data validation
    if(edit){
        if(!ll.indexOf(formData))
            isValid_data=true;
        else{
            isValid_data=false;
            document.getElementById("empty").innerHTML="***Data already exists***";
            }  
    }
    else if(!ll.indexOf(formData) && !edit)
    {
        isValid_data=true;
        ll.add(formData)
        if(isValid_name)
        document.getElementById("empty").innerHTML="";
    }
    else{
        isValid_data=false;
        if(isValid_name && !edit) document.getElementById("empty").innerHTML="***Data already exists***";
    }
}