import { Button } from 'primereact/button';
import './style.css';
import { useNavigate } from 'react-router-dom';

export interface GenericCardProps {
  imageUrl: string;
  topLabel: string;
  title: string;
  description: string;
  bottomLabel?: string;
  isButtonVisible: boolean;
  isOffWhiteFrills?: boolean;
}

const GenericCard: React.FC<GenericCardProps> = ({
  imageUrl,
  topLabel,
  title,
  description,
  bottomLabel,
  isButtonVisible,
  isOffWhiteFrills,
}) => {
  const navigate = useNavigate();
  
  const handleVisitClick = () => {
    navigate('/profile/sebo');
  };

  return (
    <div className="notebook-card">
      <div className="card-header">
        <div className="header-bg"></div>
        <div className="header-frills">
          {Array.from({ length: 11 }).map((_, index) => (
            <div key={index} className={isOffWhiteFrills ? 'frill-circle' : 'frill-circle-white'}></div>
          ))}
        </div>
      </div>
      <div className="card-content">
        <div className="image-container">
          <img src={imageUrl} alt={title} className="card-image" />
          {!isButtonVisible && (
            <div className="tag-container">
              <div className="tag">{topLabel}</div>
            </div>
          )}
        </div>
        <div className="info-container">
          <div className="text-info">
            <div className="card-title">{title}</div>
            <div className="description">{description}</div>
          </div>
          <div className="status">
            {isButtonVisible ? (
              <Button onClick={handleVisitClick} className="visit-button">
                Visitar
              </Button>
            ) : (
              <div className="bottom-label">{bottomLabel}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericCard;
