import { Request, Response, Router } from "express";
import { User, IUser, ITodo } from '../models/User'
const router: Router = Router();


type TUser = {
  name: string;
  todos: string[];
};



let userArr: TUser[] = [];
let message: string

/*router.get("/add",async (req: Request, res: Response) => {
  try {
      const poems: IPoem[] | null = await Poem.find()
      if (!poems) {
          return res.status(404).json({message: "No poems found"})
      }
      return res.json(poems)
  } catch (error: any) {
      console.log(`Error while fetching poems: ${error}`)
      return res.status(500).json({message: "Internal server error"})
  }
})*/

router.post("/add", async (req: Request, res: Response) => {
  try {
    console.log(req.body)
      const existingUser: IUser | null = await User.findOne({name: req.body.name})
      //return res.status(403)
      if (existingUser) {
          return res.status(403).json({message: "User already existed"})
      }
      const { name, todo }: { name: string; todo: ITodo } = req.body;
      const user: IUser = new User({
        name: "Test User",
        todos: [{ todo: todo }], // Directly embed the todo
      });
      /*const testTodo: ITodo = {
        todo: "testtodo",
      } as ITodo;*/
      /*const user: IUser = new User({
          name: req.body.name,
          todos: req.body.todo,
      })*/
          console.log(`req.body: ${req.body.todo}`)
     console.log(`user: ${user}`)
      await user.save()
     
      //return res.status(201).json({message: "Data saved successfully"})

  } catch (error: any) {
      console.error(`Error while saving poem: ${error}`)
      //return res.status(500).json({message: 'Internal server error'})
  }

  
}) // End add()


//  Fetch users and their todos based on their name
/*router.get("/todos/:id", async (req: Request, res: Response) => {
  const { id }   = req.params

  try {
    const data = await fs.readFile(TODO_FILE, "utf8");
    const userArr: TUser[] = JSON.parse(data);
    
   
    const user: TUser | undefined  = userArr.find((u) => u.name === id);
    console.log('tyep of user: ', typeof user)

    if (typeof user === "undefined") {
      //message = `User with name ${id} not found.`
      message = "User not found"; 
      res.json({message: message, data: ''})
    } else {
      message = 'User found'
      res.json({message: message, data: user});
    }
  } catch (err: any) {
    console.error("Error fetching user:", err);
  }
});
// End Fetch users

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
