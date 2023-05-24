import {
  FeatureDescription,
  FeatureImage,
  FeaturePageContent,
  FeaturePageTitle,
  FeaturePageWrapper,
  FeatureTitle,
  FeatureWrapper,
  Feature,
  ImageDiv,
} from "./features.styles";

import checklist from "../../media/checklist.png";
import calendar from "../../media/calendar.png";
import cook from "../../media/cook.png";

const FeaturePage = () => {
  return (
    <FeaturePageWrapper>
      <FeaturePageContent>
        <FeaturePageTitle>Features</FeaturePageTitle>
        <FeatureWrapper>
          <Feature>
            <ImageDiv>
            <FeatureImage src={checklist}></FeatureImage>
            </ImageDiv>
            <FeatureTitle>Adapt recipes to your goals</FeatureTitle>
            <FeatureDescription>
              CUKFIT is able to adapt recipes to <br></br> your weight, height,
              etc. and to <br></br> your fitness goals at the same time
            </FeatureDescription>
          </Feature>
          <Feature>
            <ImageDiv>
            <FeatureImage src={calendar}></FeatureImage>
            </ImageDiv>
            <FeatureTitle>Create weekly plan</FeatureTitle>
            <FeatureDescription>
              Select 3 recipes or more for each <br></br> meal and CUKFIT will
              create a <br></br>
              presonalised weekly meal plan
            </FeatureDescription>
          </Feature>
          <Feature style={{ marginRight: 0 }}>
            <ImageDiv>
            <FeatureImage src={cook}></FeatureImage>
            </ImageDiv>
            <FeatureTitle>Step by step</FeatureTitle>
            <FeatureDescription>
            CUKFIT provides with all the steps <br></br> necessary to cook each <br></br> recipe
            </FeatureDescription>
          </Feature>
        </FeatureWrapper>
      </FeaturePageContent>
    </FeaturePageWrapper>
  );
};

export default FeaturePage;
