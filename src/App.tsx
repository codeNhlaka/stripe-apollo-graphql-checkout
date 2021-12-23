import { PaymentProvider } from './context/checkout';
import Payment from './pages/checkout';
import './styles/payment.css';

function App() {
  return (
    <PaymentProvider>
      <div className="App">
        <Payment/>
      </div>
    </PaymentProvider>
  );
}

export default App;
