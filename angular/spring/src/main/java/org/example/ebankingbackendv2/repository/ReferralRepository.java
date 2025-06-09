package org.example.ebankingbackendv2.repository;

import org.example.ebankingbackendv2.entity.Referral;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReferralRepository extends JpaRepository<Referral, Long> {
    List<Referral> findByParrainId(Long parrainId);
    List<Referral> findByFilleulId(Long filleulId);
    Optional<Referral> findByReferralCode(String referralCode);
    boolean existsByReferralCode(String referralCode);
}