import s from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { setUserData } from '../../store/authSlice'
import { RootState } from '../../store'

import Header from "../Header"
import TokenUtils from '../../utils/TokenUtils'

const ChangeProfile = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state: RootState) => state.auth.userData)

    const [userName, setUserName] = useState(userData?.username)
    const [email, setEmail] = useState(userData?.email)
    const [firstName, setFirstName] = useState(userData?.first_name)
    const [lastName, setLastName] = useState(userData?.last_name)
    const [avatar, setAvatar] = useState<File | string | undefined>(userData?.profile_picture)
    const [description, setDescription] = useState(userData?.descr)

    const changeUserData = useForm({
        shouldUnregister: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStateVariable(e.target, name, value);
    };

    const setStateVariable = (target: HTMLInputElement | HTMLTextAreaElement, name: string, value: string) => {
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'avatar':
                if ('files' in target) {
                    const file = target.files![0];
                    setAvatar(file);
                };
                break;
        }
    };

    const changeDataUser = async () => {
        const originalUserData = userData;
        const formData = new FormData();
        if (userName !== originalUserData?.username) {
            formData.append('username', userName ?? '');
        }
        if (email !== originalUserData?.email) {
            formData.append('email', email ?? '');
        }
        if (firstName !== originalUserData?.first_name) {
            formData.append('first_name', firstName ?? '');
        }
        if (lastName !== originalUserData?.last_name) {
            formData.append('last_name', lastName ?? '');
        }
        if (description !== originalUserData?.descr) {
            formData.append('descr', description ?? '');
        }
        if (avatar instanceof File) {
            formData.append('profile_picture', avatar);
        }

        const response = await fetch(`http://127.0.0.1:8000/api/users/${userData?.id}/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${TokenUtils.getAccessToken()}`,
            },
            body: formData,
        })

        const changedData = await response.json();
        console.log(changedData)
        dispatch(setUserData(changedData));
        return true
    }

    return (
        <div>
            <Header />
            <form className={s.changeProfile} onSubmit={changeUserData.handleSubmit(changeDataUser)}>
                <div className={s.image}>
                    <input
                        id="avatar-input"
                        type="file" accept="image/*"
                        {...changeUserData.register('avatar')}
                        onChange={e => handleInputChange(e)}
                    />
                    <label htmlFor="avatar-input" className={s.avatarLabel}>
                        {userData?.profile_picture ?
                            (
                                <div className={s.avatar}>
                                    <img src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar as File)} alt="Avatar" />
                                </div>
                            )
                            : (
                                <div className={s.avatar}>
                                    <b className={s.avatarPlus}>+</b>
                                    <b className={s.avatarText}>Avatar</b>
                                </div>
                            )
                        }
                    </label>
                </div>
                <input
                    type="text"
                    className={s.nickname}
                    placeholder='UserName'
                    value={userName}
                    {...changeUserData.register('userName')}
                    onChange={e => handleInputChange(e)}
                />
                <input
                    type="email"
                    className={s.email}
                    placeholder='Email'
                    value={email}
                    {...changeUserData.register('email', {
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    })}
                    onChange={e => handleInputChange(e)}
                />
                <input
                    type="text"
                    className={s.firstname}
                    placeholder='FirstName'
                    value={firstName}
                    {...changeUserData.register('firstName')}
                    onChange={e => handleInputChange(e)}
                />
                <input
                    type="text"
                    className={s.lastname}
                    placeholder='LastName'
                    value={lastName}
                    {...changeUserData.register('lastName')}
                    onChange={e => handleInputChange(e)}
                />
                <textarea
                    className={s.description}
                    placeholder='Description'
                    value={description || ''}
                    {...changeUserData.register('description')}
                    onChange={e => handleInputChange(e)}
                />
                <button className={s.button}>Change Data</button>
            </form>
        </div>
    )
}

export default ChangeProfile