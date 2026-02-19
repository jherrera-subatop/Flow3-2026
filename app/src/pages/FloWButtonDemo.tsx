/**
 * Demo FloW DS — Button (categoría base).
 * Carga tokens FloW y muestra el componente Button.
 */
import '../flow-ds/tokens/semantic.css';
import '../flow-ds/tokens/components.css';
import { Button } from '../flow-ds/components/Button/Button';

export default function FloWButtonDemo() {
  return (
    <div className="flowButtonDemo">
      <div className="flowButtonDemoRow">
        <Button label="FloW Button" />
      </div>
      <div className="flowButtonDemoRow">
        <Button label="Hover me" onClick={() => {}} />
      </div>
      <div className="flowButtonDemoRow">
        <Button label="Disabled" disabled />
      </div>
      <div className="flowButtonDemoRow">
        <Button label="Submit" type="submit" />
      </div>
    </div>
  );
}
