var selectedRow=null;
function onFormSubmit(){
    if(validate()){
    var formData= readFormData();
    if(selectedRow==null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    clear();
    }
}
function readFormData(){
    var formData={};

    formData["Name"]=document.getElementById("Name").value;
    formData["Surname"]=document.getElementById("Surname").value;
    formData["Email"]=document.getElementById("Email").value;
    formData["Phone"]=document.getElementById("Phone").value;
    formData["Salary"]=document.getElementById("Salary").value;
    
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
    cell3.innerHTML=data.Email;
    cell4=newRow.insertCell(3);
    cell4.innerHTML=data.Phone;
    cell5=newRow.insertCell(4);
    cell5.innerHTML=data.Salary;
    cell6=newRow.insertCell(5);
    cell6.innerHTML=`<a onClick="onEdit(this)" >E</a> 
                        <a onClick="onDelete(this)">D</a>`;
    
                    

}
function clear(){
    document.getElementById("Name").value="";
    document.getElementById("Surname").value="";
    document.getElementById("Email").value="";
    document.getElementById("Phone").value="";
    document.getElementById("Salary").value="";
}
function onEdit(td){
    selectedRow=td.parentElement.parentElement;
    document.getElementById("Name").value=selectedRow.cells[0].innerHTML
    document.getElementById("Surname").value=selectedRow.cells[1].innerHTML
    document.getElementById("Email").value=selectedRow.cells[2].innerHTML
    document.getElementById("Phone").value=selectedRow.cells[3].innerHTML
    document.getElementById("Salary").value=selectedRow.cells[4].innerHTML
}
function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.Name;
    selectedRow.cells[1].innerHTML = formData.Surname;
    selectedRow.cells[2].innerHTML = formData.Email;
    selectedRow.cells[3].innerHTML = formData.Phone;
    selectedRow.cells[4].innerHTML = formData.Salary;
    console.log(selectedRow.cells[4].innerHTML);
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
    document.getElementById("nameValidationError").classList.remove("hide");
    }
    else{
        isValid= true;
        if(!document.getElementById("nameValidationError").classList.contains("hide"))
        {document.getElementById("nameValidationError").classList.add("hide");}
    }
}