import FriendStep from '@/components/home/open-box/friend-step';
import MyStep from '@/components/home/open-box/my-step';
import ToggleNav from '@/components/home/open-box/toggle-nav';
import WishStep from '@/components/home/open-box/wish-step';
import { CurrentStep } from '@/components/home/types';
import useGetRestaurantList from '@/components/home/useGetRestaurantList';
import BigHeartIcon from '@/components/icons/map/big-heart-icon';
import BigSmileIcon from '@/components/icons/map/big-smile-icon';
import BigStarIcon from '@/components/icons/map/big-star-icon';
import { useState } from 'react';
import styled, { css } from 'styled-components';

export type OpenStatusType = 'close' | 'open' | 'mid';

const TOP_ICON_LIST = [
  <BigSmileIcon key="big-smile" />,
  <BigStarIcon key="big-star" />,
  <BigHeartIcon key="big-heart" />,
];

interface OpenBoxProps {
  openStatus: OpenStatusType;
  handleToggleOpen: () => void;
}

export default function OpenBox({
  openStatus,
  handleToggleOpen,
}: OpenBoxProps) {
  const [current, setCurrent] = useState<CurrentStep>(2);
  const { wishs, mys, friends } = useGetRestaurantList();

  const handleCurrent = (next: CurrentStep) => {
    setCurrent(next);
  };

  return (
    <Wrapper
      onClick={() => {
        openStatus === 'close' && handleToggleOpen();
      }}
      openStatus={openStatus}
    >
      <InnerWrapper>
        <IconWrapper onClick={handleToggleOpen}>
          {TOP_ICON_LIST[current]}
        </IconWrapper>

        {openStatus === 'open' && (
          <div>
            <ToggleNav current={current} handleCurrent={handleCurrent} />
            {current === CurrentStep.Friend && <FriendStep list={friends} />}
            {current === CurrentStep.My && <MyStep list={mys} />}
            {current === CurrentStep.Heart && <WishStep list={wishs} />}
          </div>
        )}
      </InnerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ openStatus: OpenStatusType }>`
  width: 100%;
  height: 100vh;
  border-radius: 34px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  position: absolute;
  left: 0;
  right: 0;
  background-color: #fff;
  transition: bottom 1s;
  z-index: 20;

  ${(props) =>
    props.openStatus === 'close' &&
    css`
      bottom: calc(-100vh + 77px);
    `}
  ${(props) =>
    props.openStatus === 'mid' &&
    css`
      bottom: calc(-100vh + 210px);
    `}
    ${(props) =>
    props.openStatus === 'open' &&
    css`
      bottom: -200px;
    `};
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 50px 30px 0;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  cursor: pointer;
`;