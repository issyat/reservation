import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ReservationForm from "./components/ReservationForm"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Welcome to the Reservation System</div>} />
          <Route path="reservations/new" element={<ReservationForm />} />
          <Route path="reservations/:id/edit" element={<ReservationForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
