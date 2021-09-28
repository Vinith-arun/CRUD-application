var selectedRow=null;
isValid=true;
function onFormSubmit(){
    validate();
    if(isValid==true){
        var formData= readFormData();
        if(selectedRow==null)
            insertNewRecord(formData);
        else
            updateRecord(formData );
    }

    clear();
    
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

    console.log(formData.Hobby);

    if(document.getElementById("Phone").value != "")
        formData["Phone"]=document.getElementById("Phone").value;
    else
        formData["Phone"]="-"

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
    selectedRow=td.parentElement.parentElement;
    document.getElementById("Name").value=selectedRow.cells[0].innerHTML;
    document.getElementById("Surname").value=selectedRow.cells[1].innerHTML;
    var gender=selectedRow.cells[2].innerHTML;
    if (gender=="Male")
        document.getElementById("Male").checked=true;
    else if(gender=="Female")
        document.getElementById("Female").checked=true;
    else
        document.getElementsByName("Gender").checked=false;
    document.getElementById("Hobby").value=selectedRow.cells[3].innerHTML;
    document.getElementById("Phone").value=selectedRow.cells[4].innerHTML;
}
function updateRecord(formData ){
    selectedRow.cells[0].innerHTML = formData.Name;
    selectedRow.cells[1].innerHTML = formData.Surname;
    selectedRow.cells[2].innerHTML = formData.Gender;
    selectedRow.cells[3].innerHTML = formData.Hobby;
    selectedRow.cells[4].innerHTML = formData.Phone;
    selectedRow=null;
}
function onDelete(td){
    if(confirm('Are you sure to delete this record?')){
    row=td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
    }
}
function validate(){
    isValid=true;
    if(document.getElementById("Name").value=="") {
    isValid=false;
    document.getElementById("empty").innerHTML="This field is required*";
    }
    else{
        isValid= true;
        document.getElementById("empty").innerHTML="";
    }
}