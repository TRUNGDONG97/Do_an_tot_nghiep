import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import I18n from '../i18n/i18n'
import { ProgressDialog } from 'react-native-simple-dialogs';



const LoadingProgressBar = () => (
    <ProgressDialog
        visible={true}
        title="Đang xử lý."
        message="Vui lòng đợi..."
    />
);

export default LoadingProgressBar;