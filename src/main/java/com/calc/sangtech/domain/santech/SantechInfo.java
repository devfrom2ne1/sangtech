package com.calc.sangtech.domain.santech;

import com.calc.sangtech.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@Entity
@ToString
@Table(name = "SANTECH_INFO")
public class SantechInfo extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SANTECH_INFO_ID")
    private int santechInfoId;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "VIDEO_URL")
    private String videoUrl;

    @Column(name = "WEB_URL")
    private String webUrl;

    @Column(name = "RELATED_TABLE")
    private String relatedTable;

    @Column(name = "RELATED_ID")
    private int relatedId;

    @Column(name = "DISPLAY_YN")
    private char displayYn;
}
