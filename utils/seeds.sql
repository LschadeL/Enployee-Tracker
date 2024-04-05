iNSERT INTO departments (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Warehouse"),
       ("Development"),
       ("Customer Support");
       
iNSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate",100000,1)
       ,("Sales Manager",135000,1)
       ,("Market Coordinator",110000,2)
       ,("Global Marketing Manager",140000,2)
       ,("Forklift Operator",70000,3)
       ,("Engineer",120000,3)
       ,("Development Engineer", 170000,4)
       ,("Lab Assistant",140000,4)
       ,("Lab Manager",180000,4)
       ,("Team Lead",90000,5)
       ,("Team Member",65000,5);

iNSERT INTO employees (first_name,last_name,role_id)
VALUES ("Michael","T",1)
,( "James","T",2)
,( "Wilma","T",3)
,("Carly","T",4)
,("David","T",5)
,("Matthew","T",6)
,("Irma","T",7)
,("Courtney","T",8)
,("Shayne","T",9)
,("Antoinette","T",10)
,("Amanda","T",11);