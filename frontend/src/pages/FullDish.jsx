
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Dish } from '../components/Dish';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullDish = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);

    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/dishes/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
                console.log('DISH DATA!!!!!!!!', res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении блюда');
            });
    }, [id]);

    if (isLoading || !data) {
        return <Dish isLoading={isLoading} />;
    }

    return (
        <>
            <Dish
                id={data._id}
                name={data.name}
                type={data.typeId.name}
                user={data.user}
                createdAt={new Date(data.createdAt).toLocaleDateString('ru-RU')}
                avatarUrl={data.avatarUrl}
                isLoading={isLoading}
                isEditable
            />
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Вася Пупкин',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Ну такое себе блюдо',
                    },
                    {
                        user: {
                            fullName: 'Иван Иванов',
                            avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text:
                            'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </>
    );
};
