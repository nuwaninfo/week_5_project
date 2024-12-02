import { Request, Response, Router } from "express";
import { User, IUser, ITodo } from '../models/User'
const router: Router = Router();


type TUser = {
  name: string;
  todos: string[];
};



let userArr: TUser[] = [];
let message: string

router.post("/add", async (req: Request, res: Response) => {
  try {
   
      //const existingUser: IUser | null = await User.findOne({name: req.body.name})
      const { name, todo }: { name: string; todo: string } = req.body;
      const newTodo = {todo} as ITodo

      // Check if the user already exists
    let user: IUser | null = await User.findOne({ name });
    if (user) {
      user.todos.push(newTodo); // Push a new todo
    } else {
      // Create a new user with the provided todo
      user = new User({
        name,
        todos: [{ todo }],
      });
    }
      
                                                                                                                                      
      await user.save()
     
      return res.status(201).json({message: "Data saved successfully"})

  } catch (error: any) {
      console.error(`Error while saving poem: ${error}`)
      //return res.status(500).json({message: 'Internal server error'})
  }

  
}) // End add()


//  Fetch users and their todos based on their name
router.get("/todos/:id", async (req: Request, res: Response) => {
  const { id }   = req.params

  try {
    const user = await User.findOne({ name: id }).populate("todos");
    console.log(user)
    
    if (!user) {
      return res.status(404).json({ message: `User with name ${id} not found.` });
    }

    user.todos.forEach((element) => console.log(element));
    const arrTodos: string[] = user.todos.map((x) => x.todo);
  
    return res.status(200).json({
      message: "User found",
      data: {
        name: user.name,
        todos:arrTodos,
      },      
    });
   
  } catch (err: any) {
    console.error("Error fetching user:", err);
  }
});
// End Fetch users
/*
// Delete route
router.delete("/delete", async (req: Request, res: Response) => {
 
  let name: string = req.body.name

  try {
    const data = await fs.readFile(TODO_FILE, "utf8");
    let userArr: TUser[] = JSON.parse(data);

    const initialLength = userArr.length;
    userArr = userArr.filter((u) => u.name !== name);

    if (userArr.length === initialLength) {
      res.json({ message: `User with name "${name}" not found.`, "data" : "" });
    }

    await fs.writeFile(TODO_FILE, JSON.stringify(userArr, null, 2));

    res.json({ message: "User deleted successfully.", "data" : "" });
  } catch (err) {
    console.error("Error deleting user:", err);
  }
 
})

// update todos (delete todos)

router.put("/update", async (req: Request, res: Response) => {
  const { name, todo } = req.body;

  let todoDelete : boolean = false

  try {
    const data = await fs.readFile(TODO_FILE, "utf8");
    const userArr: TUser[] = JSON.parse(data);

    const userIndex = userArr.findIndex((user) => user.name === name);
    if (userIndex === -1) {
      message = "User not found"
      res.json({message: message});
      process.exit(0);
    }

    const todoIndex = userArr[userIndex].todos.indexOf(todo);
    if (todoIndex === -1) {
      message = "Todo not found"
      res.json({message: message});
      process.exit(0);
    }
    userArr[userIndex].todos.splice(todoIndex, 1);

    await fs.writeFile(TODO_FILE, JSON.stringify(userArr, null, 2));
    message = "Todo deleted successfully."
    todoDelete = true
    res.json({message: message, todoDelete: todoDelete});
  } catch (err) {
    console.error("Error updating todo:", err);
  }
});
*/
export default router;
