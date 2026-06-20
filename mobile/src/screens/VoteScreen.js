import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { api } from '../api/client';
import { theme } from '../theme';

export default function VoteScreen({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getElection(id)
      .then((res) => {
        setData(res);
        if (res.has_voted) {
          setSelected(res.voted_candidate_id);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVote = async () => {
    if (!selected) {
      Alert.alert('Error', 'Please select a candidate to generate a ballot.');
      return;
    }
    setSubmitting(true);
    try {
      await api.castVote({ election_id: Number(id), candidate_id: selected });
      Alert.alert('Success', 'Cryptographic ballot cast successfully!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Voting Failed', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.cyanAccent} />
      </View>
    );
  }

  if (!data.election) {
    return (
      <View style={styles.center}>
        <Text style={{ color: theme.colors.error }}>Election data not available</Text>
      </View>
    );
  }

  const { election, candidates, has_voted } = data;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← ABORT</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Secure Ballot</Text>
      <Text style={styles.subtitle}>{election.title.toUpperCase()}</Text>

      {has_voted ? (
        <View style={styles.votedCard}>
          <Text style={styles.votedText}>VOTE ALREADY SECURED FOR THIS LEDGER</Text>
        </View>
      ) : (
        <>
          <View style={styles.candidateList}>
            {candidates.map((c) => (
              <TouchableOpacity 
                key={c.id} 
                style={[styles.candidateCard, selected === c.id && styles.candidateSelected]}
                onPress={() => setSelected(c.id)}
              >
                <View style={styles.radioContainer}>
                  <View style={[styles.radioOuter, selected === c.id && styles.radioOuterSelected]}>
                    {selected === c.id && <View style={styles.radioInner} />}
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.candidateName}>{c.full_name}</Text>
                  {c.party && <Text style={styles.candidateParty}>{c.party}</Text>}
                  <Text style={styles.candidateBio} numberOfLines={3}>{c.bio}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity 
            style={[styles.submitBtn, (!selected || submitting) && styles.submitBtnDisabled]}
            onPress={handleVote}
            disabled={!selected || submitting}
          >
            {submitting ? (
              <ActivityIndicator color={theme.colors.background} />
            ) : (
              <Text style={styles.submitBtnText}>SIGN & SUBMIT BALLOT</Text>
            )}
          </TouchableOpacity>
        </>
      )}
      <View style={{ height: theme.spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  backBtn: { marginBottom: theme.spacing.md },
  backText: { ...theme.typography.label, color: theme.colors.textMuted },
  title: { ...theme.typography.h1, fontSize: 28, marginBottom: theme.spacing.xs },
  subtitle: { ...theme.typography.label, color: theme.colors.cyanAccent, marginBottom: theme.spacing.lg },
  candidateList: { marginBottom: theme.spacing.lg },
  candidateCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  candidateSelected: {
    borderColor: theme.colors.cyanAccent,
    backgroundColor: theme.colors.cyanMuted,
  },
  radioContainer: {
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  radioOuter: {
    height: 20, width: 20, borderRadius: 10,
    borderWidth: 2, borderColor: theme.colors.textMuted,
    justifyContent: 'center', alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: theme.colors.cyanAccent,
  },
  radioInner: {
    height: 10, width: 10, borderRadius: 5,
    backgroundColor: theme.colors.cyanAccent,
  },
  candidateName: { ...theme.typography.h2, fontSize: 18 },
  candidateParty: { ...theme.typography.label, color: theme.colors.cyanAccent, marginTop: 4 },
  candidateBio: { ...theme.typography.body, fontSize: 14, marginTop: 8 },
  submitBtn: {
    backgroundColor: theme.colors.cyanAccent,
    padding: theme.spacing.md,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: theme.colors.textMuted,
  },
  submitBtnText: {
    ...theme.typography.label,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  votedCard: {
    backgroundColor: 'rgba(0, 204, 102, 0.1)',
    padding: theme.spacing.lg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.success,
    alignItems: 'center',
  },
  votedText: {
    ...theme.typography.label,
    color: theme.colors.success,
  },
});
