import { useTranslation } from 'react-i18next';
import { CSSProperties, memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPageHeader.module.scss';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import SettingsIcon from '@/shared/assets/icons/settings.svg';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { useMainPageFeedType } from '../../model/selectors/mainPageSelectors';
import { ArticleFeedType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { mainPageActions } from '../../model/slices/mainPageSlice';

interface MainPageHeaderProps {
    className?: string;
}

const buttonStyles: CSSProperties = { padding: '0', paddingBottom: '8px' };

export const MainPageHeader = memo((props: MainPageHeaderProps) => {
    const { className } = props;
    const feedType = useMainPageFeedType();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const buttonTypes = useMemo(
        () => [
            {
                type: ArticleFeedType.ALL,
                text: t('Articles'),
            },
            {
                type: ArticleFeedType.DISCOVER,
                text: t('Discover'),
            },
            {
                type: ArticleFeedType.HISTORY,
                text: t('History'),
            },
            {
                type: ArticleFeedType.MY_ARTICLES,
                text: t('My Articles'),
            },
        ],
        [t],
    );

    const onClickButton = useCallback(
        (type: ArticleFeedType) => {
            dispatch(mainPageActions.setFeedType(type));
        },
        [dispatch],
    );

    return (
        <Card
            className={classNames(cls.MainPageHeader, {}, [className])}
            padding="16"
            max
        >
            <VStack max gap="16">
                <HStack max justify="between">
                    <Text text={t('My feed')} size="l" />
                    <Icon height={24} width={24} Svg={SettingsIcon} />
                </HStack>
                <HStack max gap="16">
                    {buttonTypes.map((button) => (
                        <Button
                            variant={
                                feedType === button.type
                                    ? 'highlighted'
                                    : 'clear'
                            }
                            styles={buttonStyles}
                            onClick={() => onClickButton(button.type)}
                        >
                            <Text text={button.text} />
                        </Button>
                    ))}
                </HStack>
            </VStack>
        </Card>
    );
});
