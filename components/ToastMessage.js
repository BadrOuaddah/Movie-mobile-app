import React from "react";
import Toast from "react-native-toast-message";

export default function ToastMessage() {
	return <Toast />;
}

export const showToast = (type, text1, text2 = "") => {
	Toast.show({
		type: type,
		text1: text1,
		text2: text2
	});
};
