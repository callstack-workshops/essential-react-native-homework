import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { colors } from "../colors";
import { useFormik } from "formik";
import { useNewLottery } from "../hooks/useNewLottery";
import * as Yup from 'yup';
import { ActivityIndicator } from "react-native";

const lotterySchema = Yup.object({
    name: Yup.string().min(4).required(),
    prize: Yup.string().min(4).required(),
  });
  

export default function AddLotteryForm() {
    const { createNewLottery, error, loading } = useNewLottery();

    const showToast = () => {
        ToastAndroid.show('Lottery created successfully!', ToastAndroid.SHORT);
      };

    const formik = useFormik({
        validationSchema: lotterySchema,
        validateOnChange: true,
        validateOnMount: true,
        initialValues: {
          name: '',
          prize: '',
        },
        onSubmit: (values) => {
          createNewLottery({ name: values.name, prize: values.prize })
            .then(() => {
                formik.resetForm({ values: { name: '', prize: '' } });
                showToast();
            })
            .catch((error) => {
                console.error(error);
            });
        },
    });

    const nameError = formik.errors.name && formik.touched.name;
    const prizeError = formik.errors.prize && formik.touched.prize;
    const isButtonDisabled = !formik.isValid || nameError || prizeError;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Lottery</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Lottery name"
                    placeholderTextColor={colors.grey}
                    onChangeText={formik.handleChange('name')}
                    value={formik.values.name}
                    onBlur={formik.handleBlur('name')}
                />
                {nameError && <Text style={styles.error}>{formik.errors.name}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Lottery prize"
                    placeholderTextColor={colors.grey}
                    onChangeText={formik.handleChange('prize')}
                    value={formik.values.prize}
                    onBlur={formik.handleBlur('prize')}
                />
                {prizeError && <Text style={styles.error}>{formik.errors.prize}</Text>}
            </View>
            <Pressable
                style={{...styles.button, backgroundColor: isButtonDisabled ? colors.grey : colors.buttonPrimary}}
                disabled={!formik.isValid}
                onPress={() => {
                    formik.handleSubmit();
                }}
            >
                {loading? <ActivityIndicator size="small" color={colors.secondary} /> : <Text>ADD</Text>}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingInline: 24,
    },
    input: {
        borderColor: colors.grey,
        padding: 8,
        borderBottomWidth: 1,
        width: '100%',
        fontSize: 16,
    },
    button: {
        color: colors.secondary,
        padding: 12,
        borderRadius: 8,
        textAlign: 'center',
        alignSelf: 'flex-start'
    },
    error: {
        color: colors.danger,
        fontSize: 12,
    },
})