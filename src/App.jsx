import { AppRouter } from "./router/AppRouter"
import firebase, { FirebaseContext } from "./firebase"
import './App.css'

function App() {

  return (
    <div className="h-full bg-neutral-50 bg-main">
      <FirebaseContext.Provider 
        value={{
          firebase
        }}
      >
        <AppRouter />
      </FirebaseContext.Provider>
    </div>
  )
}

export default App
