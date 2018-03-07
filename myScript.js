

	var array= [];

	function getText()
	{	
		var text = document.getElementById("addText").value;
		
		document.getElementById("addText").value = "";
		return text;
	}
	
	function addRow(obav="",chec = "false")
	{
		var che;
		if(chec == "false")
		{
			che = false;
		}
		else 
		{
			che = true;
		}

		var text = obav.length == 0 ? getText() : obav;
		if(text != "")
		{
		var table = document.getElementById("myTable");
		var row = table.insertRow(table.rows.length);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
			
		var checkbox = document.createElement("INPUT");
		checkbox.type = "checkbox";
		var naziv = "box";
		checkbox.name = naziv;
		checkbox.checked = che;
		checkbox.onclick = function() {  selected(row.rowIndex); }
		
		var butn = document.createElement("BUTTON");
		butn.type = "button";
		butn.value = "button";   
		butn.className ="image";
		butn.onclick = function() {	deleteRow(row.rowIndex); }
				
		cell1.className="lijevo";
		cell1.innerHTML = text;
		cell2.appendChild(checkbox);
		cell3.appendChild(butn);
		selected(row.rowIndex);
		
		var object = {obaveza: text, check: che};
		array.push(object);
		
		localStorage.zapisRecord = JSON.stringify(array);
	}
	}
	
	function init()
	{
		if(localStorage.zapisRecord)
		{
			array = [];
			var arr = JSON.parse(localStorage.zapisRecord);
			for(var i = 0; i<arr.length;i++)
			{
				var a = arr[i].check == true ? "true" : "false";
				addRow(arr[i].obaveza, a);
			}
		}
		
	}

	 function deleteRow(element)
	 {
		var row = document.getElementById("myTable").rows[element];
		var text = row.cells[0].innerHTML;
		for( var i =0; i< array.length; i++)
		{
			if(array[i].obaveza == text)
			{	
				array.splice(i,1);
				localStorage.zapisRecord = JSON.stringify(array);
				break;
			}
		}
		document.getElementById("myTable").deleteRow(element);
		
	 }
	 
	 function selected(element)
	 {
			
			var row = document.getElementById("myTable").rows[element];
			var text = row.cells[0].innerHTML;
			var box = document.getElementsByName("box");
			var flag = box[element-1].checked;
			if(flag==true)
			{
				row.cells[0].className = "lijevoSelected";
				row.cells[1].className = "centarSelected";
				row.cells[2].className = "centarSelected";
			}
			else
			{
				row.cells[0].className = "lijevo";
				row.cells[1].className = NaN;
				row.cells[2].className = NaN;
			}
			
			for( var i =0; i< array.length; i++)
			{
				if(array[i].obaveza == text)
				{	
					
					array[i].check = flag;
					localStorage.zapisRecord = JSON.stringify(array);
					break;
				}
			}
			
			
	 }