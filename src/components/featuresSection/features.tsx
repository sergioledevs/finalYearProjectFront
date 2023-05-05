import { FeatureDescription, FeatureImage, FeaturePageContent, FeaturePageTitle, FeaturePageWrapper, FeatureTitle, FeatureWrapper } from "./features.styles";

import checklist from "../../media/checklist.png"
import calendar from "../../media/calendar.png"
import cook from "../../media/cook.png"
import Footer from "../footer/footer";

const Feature = ({ image, title, description }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px', margin: '20px' }}>
      <img src={image} alt={title} style={{ marginBottom: '30px',width:'80px', height:'80px' }} />
      <h3 style={{ marginBottom: '5px' }}>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const FeaturePage = () => {
  return (
    <FeaturePageWrapper>
      <FeaturePageContent>
        <FeaturePageTitle>Features</FeaturePageTitle>
        <FeatureWrapper>
          <Feature
            image={checklist}
            title="Feature 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sem id elit bibendum venenatis. Ut interdum commodo nibh, sit amet."
          />
          <Feature
            image={calendar}
            title="Feature 2"
            description="Phasellus nec nisl ac tortor commodo viverra. Proin non neque quis turpis euismod commodo. Suspendisse potenti. Integer id nulla ac mauris tempor commodo vitae vel mauris."
          />
          <Feature
            image={cook}
            title="Feature 3"
            description="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam non enim velit. Donec viverra dolor id dapibus iaculis. Sed euismod ante ac turpis luctus."
          />
        </FeatureWrapper>
      </FeaturePageContent>
      
    </FeaturePageWrapper>
  );
};

export default FeaturePage;