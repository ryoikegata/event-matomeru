import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  UIEvent,
  TouchEvent,
} from "react";

import styles from "./SwipeableDrawer.module.css";

import { Easing, EasingType } from "./Easing";

interface Props {
  children?: ReactNode;
  opened: boolean;
  speed?: number;
  easingType?: EasingType;
  onBeforeEnter?: () => void;
  onAfterEnter?: () => void;
  onBeforeLeave?: () => void;
  onAfterLeave?: () => void;
  onClose?: () => void;
  onScroll?: () => void;
}

const SwipeableDrawer = ({
  children,
  opened = false,
  speed = 300,
  easingType = "easeOutCubic",
  onBeforeEnter,
  onAfterEnter,
  onBeforeLeave,
  onAfterLeave,
  onClose,
  onScroll,
}: Props) => {
  const [start, setStart] = useState({ x: 0, y: 0 });

  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const [end, setEnd] = useState({ x: 0, y: 0 });

  const [openState, setOpenState] = useState(false);

  const gap = 30;

  const [windowHeight, setWindowHeight] = useState(0);

  const [contentScrollHeight, setContentScrollHeight] = useState(0);

  const [contentClientHeight, setContentClientHeight] = useState(0);

  const [touchStartedAt, setTouchStartedAt] = useState(0);

  const [scrollTop, setScrollTop] = useState(0);

  const [flickable, setFlickable] = useState(false);

  const easing: Easing = new Easing(easingType, speed);

  const scrollableElement = useRef<HTMLDivElement>(null);

  const openDrawer = (): void => {
    if (onBeforeEnter) onBeforeEnter();

    easing!.animate({
      startValue: delta.y,
      endValue: 0,
      progress: (value) => {
        setDelta({ ...delta, y: value > 0 ? value : 0 });
      },
      complete: () => {
        if (scrollableElement?.current) {
          setContentClientHeight(scrollableElement.current.clientHeight);
          setContentScrollHeight(scrollableElement.current.scrollHeight);
        }

        if (onAfterEnter) onAfterEnter();
      },
    });
  };

  const closeDrawer = (): void => {
    if (onBeforeLeave) onBeforeLeave();

    easing!.animate({
      startValue: delta.y,
      endValue: contentClientHeight + gap,
      progress: (value) => {
        setDelta({ ...delta, y: value });
      },
      complete: () => {
        setOpenState(false);

        if (onAfterLeave) onAfterLeave();
        if (onClose) onClose();
      },
    });
  };

  const touchstart = (event: TouchEvent<HTMLDivElement>): void => {
    setStart({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
    setDelta({ x: 0, y: 0 });
    setEnd({ x: 0, y: 0 });

    setTouchStartedAt(new Date().getTime());

    // コンテンツ部分のスクロール量が -5 ~ 0 のときだけflickで閉じられるようにする
    // マイナスはiOSのバウンス分を考慮したもの
    setFlickable(scrollTop > -5 && scrollTop <= 0);
  };

  const touchmove = (event: TouchEvent<HTMLDivElement>): void => {
    const diffX = end.x + event.changedTouches[0].clientX - start.x;
    const diffY = end.y + event.changedTouches[0].clientY - start.y;

    const redian = Math.atan2(diffY, diffX);
    const angle = redian * (180 / Math.PI); // ラジアンを度数へ変換

    // 下方向のみに引っ張れるようにする
    // 動かせるのはコンテンツ部分のスクロール量が0以下のときのみ
    if (scrollTop <= 0 && angle > 30 && angle < 150) {
      setDelta({ ...delta, y: diffY });
    } else {
      setDelta({ ...delta, y: 0 });
    }
  };

  const touchend = (): void => {
    setEnd({ ...end, y: delta.y });

    // 下にswipeしたら閉じる
    if (delta.y > windowHeight / 3) {
      closeDrawer();
    } else {
      // コンテンツ部分のスクロール量が0の場合に、200ms 以内に 60px 下にflickしたら閉じる
      const touchingTime = new Date().getTime() - touchStartedAt;
      if (flickable && touchingTime < 200 && delta.y > 60) {
        closeDrawer();
      } else {
        // それ以外は上に戻る
        openDrawer();
      }
    }

    setFlickable(false);
  };

  const scrollDrawer = (event: UIEvent): void => {
    setScrollTop(event.currentTarget.scrollTop);
    if (onScroll) onScroll();
  };

  useEffect(() => {
    if (opened === openState) {
      return;
    }

    if (opened) {
      const { outerHeight } = window;

      setWindowHeight(outerHeight);

      setDelta({ ...delta, y: outerHeight });

      setOpenState(true);
    } else {
      closeDrawer();
    }
  }, [opened]);

  useEffect(() => {
    if (openState && scrollableElement?.current) {
      // コンテンツが短い場合に全体の高さをそこまでとする
      setContentClientHeight(
        scrollableElement.current.clientHeight === 0
          ? window.outerHeight
          : scrollableElement.current.clientHeight
      );
      setContentScrollHeight(
        scrollableElement.current.scrollHeight === 0
          ? window.outerHeight
          : scrollableElement.current.scrollHeight
      );

      openDrawer();
    }
  }, [openState, scrollableElement]);

  return (
    <>
      {openState && (
        <div className={styles.container}>
          <div
            style={
              {
                "--delta-y": `${delta.y}px`,
                "--opacity": 1 - delta.y / contentClientHeight,
                "--rotate": `${delta.y < 25 ? 25 - delta.y : 0}deg`,
                "--gap": `${gap}px`,
              } as CSSProperties
            }
          >
            <div className={styles.background} onClick={closeDrawer} />

            <div
              className={styles.drawer}
              style={{ height: `${contentScrollHeight}px` }}
            >
              <div className={styles.closeButton} onClick={closeDrawer} />

              <div
                className={styles.body}
                style={{ overflow: delta.y > 0 ? "hidden" : "auto" }}
                onTouchStart={(e) => touchstart(e)}
                onTouchMove={(e) => touchmove(e)}
                onTouchEnd={() => touchend()}
                onScroll={(e) => scrollDrawer(e)}
              >
                <div ref={scrollableElement}>{children}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SwipeableDrawer;
